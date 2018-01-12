import { NotFound, BadRequest, Conflict, PaymentError } from 'fejl'
import _ from 'lodash'
import path from 'path'
import newClientProducer from '../producers/newClientProducer'
import newAddressProducer from '../producers/newAddressProducer'
import newSubscriptionDDCB from '../producers/newSubscriptionDDCB'
import newSubscriptionADLCB from '../producers/newSubscriptionADLCB'
import newSubscriptionADLSEPA from '../producers/newSubscriptionADLSEPA'

import stripe from '../lib/stripe'
import Emailer from '../lib/emailer'
import { env } from '../lib/env'

const assertEmail = BadRequest.makeAssert('No email given')
const pickProps = data =>
  _.pick(data, [
    'client_id',
    'address_delivery_id',
    'address_invoice_id',
    'token_id',
    'offer_id',
    'payment_method',
    'is_gift',
    'cgv_accepted',
    'source'
  ])

export default class CheckoutService {
  constructor(
    checkoutStore,
    clientStore,
    addressStore,
    tokenStore,
    offerStore,
    chargeStore
  ) {
    this.clientStore = clientStore
    this.addressStore = addressStore
    this.tokenStore = tokenStore
    this.offerStore = offerStore
    this.checkoutStore = checkoutStore
    this.chargeStore = chargeStore
  }

  async findById(id) {
    BadRequest.assert(id, 'No id payload given')

    const checkout = await this.checkoutStore.getById(id)
    NotFound.assert(checkout, `Checkout with id "${id}" not found`)

    return { checkout }
  }

  async create(body) {
    BadRequest.assert(body, 'No data received')

    const pickedCheckout = _.pick(
      ['payment_method', 'cgv_accepted', 'status'],
      body.checkout
    )
    const pickedToken = _.pick(body.token, ['token_id'])
    const pickedOffer = _.pick(body.offer, ['aboweb_id', 'offer_id'])
    const pickedClient = _.pick(body.client.data, ['client_id', 'email'])
    const pickedAddressInvoice = _.pick(body.addressInvoice, [
      'address_id',
      'is_equal',
      'type_address'
    ])
    const pickedAddressDelivery = _.pick(body.addressDelivery, [
      'address_id',
      'is_equal',
      'type_address'
    ])

    BadRequest.assert(pickedClient.client_id, 'client_id is required')
    BadRequest.assert(
      pickedAddressInvoice.address_id,
      'address invoice id is required'
    )
    BadRequest.assert(pickedOffer.offer_id, 'offer_id is required')

    const client = await this.clientStore.getById(pickedClient.client_id)
    NotFound.assert(client, `client "${pickedClient.client_id}" not found`)

    const addressInvoice = await this.addressStore.getById(
      pickedAddressInvoice.address_id
    )
    NotFound.assert(
      addressInvoice,
      `address invoice "${pickedAddressInvoice.address_id}" not found`
    )

    let addressDelivery = await this.addressStore.getById(
      pickedAddressDelivery.address_id
    )

    if (!addressDelivery) {
      addressDelivery = addressInvoice
    }

    const useSameAddressDelivery =
      addressDelivery.address_equal && addressInvoice.address_equal

    if (!client.aboweb_id) {
      const producerClient = await newClientProducer({
        client: client,
        addressInvoice,
        addressDelivery
      })
    }
    if (!useSameAddressDelivery) {
      const producerAddressDelivery = await newAddressProducer({
        client: client,
        addressInvoice,
        addressDelivery
      })
    }

    const offer = await this.offerStore.getByAbowebId(pickedOffer.aboweb_id)
    NotFound.assert(
      offer,
      `Checkout with offer "${pickedOffer.offer_id}" not found`
    )

    let token = null

    if (!offer.is_free_gift && !offer.is_free) {
      BadRequest.assert(pickedToken.token_id, 'token_id is required')
      token = await this.tokenStore.getByIdAndClientId(
        pickedToken.token_id,
        client.client_id
      )
      NotFound.assert(
        token,
        `Checkout with token "${pickedToken.token_id}" not found`
      )
    }

    const checkoutStored = await this.checkoutStore.create(pickedCheckout)
    if (!offer.is_free_gift && !offer.is_free) {
      checkoutStored.setToken(token)
    }
    checkoutStored.setClient(client)
    checkoutStored.setOffer(offer)
    checkoutStored.setDelivery_address(addressDelivery)
    checkoutStored.setInvoice_address(addressInvoice)
    checkoutStored.status = 'created'
    checkoutStored.cgv_accepted = pickedCheckout.cgv_accepted

    const checkoutSaved = await checkoutStored.save()

    // OFFRE ESSAI GRATUIT
    if (
      offer.time_limited &&
      offer.payment_method === 0 &&
      offer.is_free_gift &&
      offer.is_free
    ) {
      try {
        checkoutStored.status = 'free'
        checkoutStored.payment_method = 0
        checkoutStored.is_gift = true

        const producer = await newSubscriptionDDCB({
          offer: offer,
          checkout: checkoutStored,
          client: client
        })

        const mail = await this.sendMailsubscribe(
          '54c6a2a9-386b-4934-a5dd-832f1387fc9b',
          ['try-free', 'try'],
          client,
          offer,
          checkoutStored,
          null,
          addressDelivery,
          addressInvoice
        )
        console.log(mail)
      } catch (err) {
        checkoutStored.status = 'declined'
        PaymentError.assert(!err, err.message)
      }
    }

    //Offre PARRAIN DD CB
    if (offer.time_limited && offer.payment_method === 2 && offer.is_gift) {
      checkoutStored.is_gift = true

      try {
        const chargeStripe = await this.chargeCard(
          token,
          offer,
          checkoutStored,
          client
        )

        checkoutStored.status = 'cb/paid'

        const mail = await this.sendMailsubscribe(
          '9c4747d5-e833-419c-b3d8-64b5f099d0b8',
          ['subscription-offer-cb', 'subscription-offer', 'subscription'],
          client,
          offer,
          checkoutStored,
          token,
          addressDelivery,
          addressInvoice
        )

        //TODO WAITING FOR ABOWEB REPLY ABOUT PARRAINAGE ET CODE PARRAIN
        // const producer = await newSubscriptionDDCB({
        //   offer: offer,
        //   checkout: checkoutStored,
        //   client: client
        // })
      } catch (err) {
        checkoutStored.status = 'cb/declined'
        PaymentError.assert(!err, err.message)
      }
    }

    // OFFRE À Durée Déterminée && Stripe CB Payment
    if (
      offer.time_limited &&
      offer.payment_method === 2 &&
      !offer.is_free_gift &&
      !offer.is_free &&
      !offer.is_gift
    ) {
      try {
        const chargeStripe = await this.chargeCard(
          token,
          offer,
          checkoutStored,
          client
        )

        checkoutStored.payment_method = 2
        checkoutStored.is_gift = false
        checkoutStored.status = 'cb/paid'

        const producer = await newSubscriptionDDCB({
          offer: offer,
          checkout: checkoutStored,
          client: client,
          token: token,
          addressInvoice,
          addressDelivery
        })
        const mail = await this.sendMailsubscribe(
          '90ab196e-58ff-4521-99a6-81470ac942b5',
          ['subscription-add-cb', 'subscription-add', 'subscription'],
          client,
          offer,
          checkoutStored,
          token,
          addressDelivery,
          addressInvoice
        )
        console.log(mail)
      } catch (err) {
        checkoutStored.status = 'cb/declined'
        PaymentError.assert(!err, err.message)
      }
    }

    // OFFRE À Durée Libre && Stripe CB Token
    if (
      !offer.time_limited &&
      offer.payment_method === 2 &&
      !offer.is_free_gift &&
      !offer.is_free
    ) {
      try {
        const producer = await newSubscriptionADLCB({
          offer: offer,
          checkout: checkoutStored,
          client: client,
          token: token,
          addressInvoice,
          addressDelivery
        })
        checkoutStored.payment_method = 2
        checkoutStored.is_gift = false
        checkoutStored.status = 'cb/signed'

        const mail = await this.sendMailsubscribe(
          '0df0b4c6-ccc3-4ed2-b496-ccf7232216d1',
          ['subscription-adl-cb', 'subscription-adl', 'subscription'],
          client,
          offer,
          checkoutStored,
          token,
          addressDelivery,
          addressInvoice
        )
        console.log(mail)
      } catch (err) {
        checkoutStored.status = 'cb/aboweb-error'
        PaymentError.assert(!err, err.message)
      }
    }

    // OFFRE À Durée Libre && SLIMPAY token
    if (
      !offer.time_limited &&
      offer.payment_method === 1 &&
      !offer.is_free_gift &&
      !offer.is_free
    ) {
      try {
        const producer = await newSubscriptionADLSEPA({
          offer: offer,
          checkout: checkoutStored,
          client: client,
          token: token,
          addressInvoice,
          addressDelivery
        })
        checkoutStored.payment_method = 1
        checkoutStored.status = 'mandate/signed'
        const mail = await this.sendMailsubscribe(
          '0df0b4c6-ccc3-4ed2-b496-ccf7232216d1',
          ['subscription-adl-sepa', 'subscription-adl', 'subscription'],
          client,
          offer,
          checkoutStored,
          token,
          addressDelivery,
          addressInvoice
        )
        console.log(mail)
      } catch (err) {
        checkoutStored.status = 'mandate/aboweb-error'
        PaymentError.assert(!err, err.message)
      }
    }

    const checkoutreturn = await checkoutStored.save()
    return { checkout: checkoutreturn }
  }

  async chargeCard(token, offer, checkout, client) {
    const stripeCharge = await stripe.charges.create({
      amount: this.calculAmount(offer),
      currency: 'eur',
      description: offer.description,
      customer: token.stripe_customer_id,
      metadata: { order_id: checkout.checkout_id }
    })

    const chargeStored = await this.chargeStore.create({
      stripe_charge_return: stripeCharge
    })
    chargeStored.setToken(token)
    chargeStored.setClient(client)
    chargeStored.setCheckout(checkout)

    return stripeCharge
  }

  calculAmount(offer) {
    return offer.price_ttc
  }

  async sendMailsubscribe(
    templateId,
    type,
    client,
    offer,
    checkout,
    token,
    addressDelivery,
    addressInvoice
  ) {
    console.log(templateId)
    const mail = {
      to: {
        email: client.email,
        name: `${client.first_name} ${client.last_name}`
      },
      from: 'Ebdo <contact+newsubscription@ebdo-lejournal.com>',
      templateId: templateId,
      category: type,
      substitutions: {
        checkout_checkout_id: checkout.checkout_id,
        client_first_name: client.first_name,
        client_client_aboweb_id: client.aboweb_client_id,
        offer_month: offer.duration ? offer.duration / 4 : 4,
        card_brand: token
          ? offer.payment_method === 1 ? 'IBAN' : token.stripe_card_brand
          : '',
        card_last4: token
          ? offer.payment_method === 1
            ? token.slimpay_iban || ''
            : token.stripe_card_last4 || ''
          : '',
        offer_subprice_ttc:
          offer.duration > 0
            ? offer.monthly_price_ttc * (offer.duration / 4)
            : offer.monthly_price_ttc,
        offer_price_ttc: offer.price_ttc / 100,
        offer_shipping_cost:
          offer.duration > 0
            ? offer.duration * offer.shipping_cost
            : offer.shipping_cost * 4,
        offer_country: addressDelivery.country,
        addressInvoice_first_name: addressInvoice.first_name,
        addressInvoice_last_name: addressInvoice.last_name,
        addressInvoice_company: addressInvoice.company || '',
        addressInvoice_address: addressInvoice.address,
        addressInvoice_address_post: addressInvoice.address_post || '',
        addressInvoice_postal_code: addressInvoice.postal_code,
        addressInvoice_city: addressInvoice.city,
        addressInvoice_country: addressInvoice.country,
        addressDelivery_first_name: addressDelivery.first_name,
        addressDelivery_last_name: addressDelivery.last_name,
        addressDelivery_company: addressDelivery.company,
        addressDelivery_address: addressDelivery.address,
        addressDelivery_address_post: addressDelivery.address_post || '',
        addressDelivery_postal_code: addressDelivery.postal_code,
        addressDelivery_city: addressDelivery.city,
        addressDelivery_country: addressDelivery.country,
        offer_duration: offer.duration,
        offer_monthly_price_ttc: offer.monthly_price_ttc,
        website_url: env.FRONT_URL
      }
    }
    console.log(mail)
    return Emailer.send(mail)
      .then(e => {
        console.log(e)
      })
      .catch(error => {
        //Log friendly error
        console.error(error.toString())
      })
  }

  async updateAboweb(id, data) {
    BadRequest.assert(id, 'No id checkout payload given')

    const pickedCheckout = _.pick(data.checkout, ['aboweb_subscribe_id'])
    BadRequest.assert(pickedCheckout, 'No checkout payload given')
    BadRequest.assert(
      pickedCheckout.aboweb_subscribe_id,
      'No aboweb payload given'
    )

    const checkoutObject = await this.findById(id)

    const offer = await this.offerStore.getById(
      checkoutObject.checkout.offer_id
    )
    NotFound.assert(offer, `Offer with "${JSON.stringify(offer)}" not found`)
    if (offer.time_limited && offer.payment_method === 2) {
      pickedCheckout.status = 'cb/signed/aboweb-transfered'
    } else {
      pickedCheckout.status = 'mandate/signed/aboweb-transfered'
    }

    return this.checkoutStore
      .update(id, pickedCheckout)
      .then(res => ({ updated: true, checkout: res[1][0] }))
      .catch(err =>
        Conflict.assert(
          err,
          `Checkout with id "${err.errors[0].message}" is unavailable to update`
        )
      )
  }
}
