import { NotFound, BadRequest, Conflict, PaymentError } from 'fejl'
import _ from 'lodash'
import newClientProducer from '../producers/newClientProducer'
import newSubscriptionProducer from '../producers/newSubscriptionProducer'
import stripe from '../lib/stripe'

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

  async create(body) {
    BadRequest.assert(body.checkout, 'No checkout payload given')
    const pickedCheckout = pickProps(body.checkout)
    BadRequest.assert(pickedCheckout.client_id, 'client_id is required')
    BadRequest.assert(
      pickedCheckout.address_invoice_id,
      'address_invoice_id is required'
    )
    BadRequest.assert(
      pickedCheckout.address_delivery_id,
      'address_delivery_id is required'
    )
    BadRequest.assert(pickedCheckout.token_id, 'token_id is required')
    BadRequest.assert(pickedCheckout.offer_id, 'offer_id is required')

    const client = await this.clientStore.getById(pickedCheckout.client_id)
    NotFound.assert(
      client,
      `Checkout with client "${pickedCheckout.client_id}" not found`
    )

    const addressInvoice = await this.addressStore.getByIdAndClientId(
      pickedCheckout.address_invoice_id,
      pickedCheckout.client_id
    )
    NotFound.assert(
      addressInvoice,
      `Checkout with address invoice "${
        pickedCheckout.address_invoice_id
      }" not found`
    )

    const addressDelivery = await this.addressStore.getByIdAndClientId(
      pickedCheckout.address_delivery_id,
      pickedCheckout.client_id
    )
    NotFound.assert(
      addressDelivery,
      `Checkout with address delivery "${
        pickedCheckout.address_delivery_id
      }" not found`
    )

    newClientProducer({ client, addressDelivery, addressInvoice })

    const token = await this.tokenStore.getByIdAndClientId(
      pickedCheckout.token_id,
      pickedCheckout.client_id
    )
    NotFound.assert(
      token,
      `Checkout with token "${pickedCheckout.token_id}" not found`
    )

    const offer = await this.offerStore.getById(pickedCheckout.offer_id)
    NotFound.assert(
      offer,
      `Checkout with offer "${pickedCheckout.offer_id}" not found`
    )

    const checkoutStored = await this.checkoutStore.create(pickedCheckout)
    checkoutStored.setClient(client)
    checkoutStored.setOffer(offer)
    checkoutStored.setToken(token)
    checkoutStored.setDelivery_address(addressDelivery)
    checkoutStored.setInvoice_address(addressInvoice)
    checkoutStored.status = 'created'

    if (offer.time_limited) {
      try {
        const chargeStripe = await this.chargeCard(
          token,
          offer,
          checkoutStored,
          client
        )
        checkoutStored.status = 'paid'

        const producer = await newSubscriptionProducer({
          offer,
          checkoutStored,
          client,
          addressInvoice,
          addressDelivery
        })
      } catch (err) {
        checkoutStored.status = 'declined'
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
}
