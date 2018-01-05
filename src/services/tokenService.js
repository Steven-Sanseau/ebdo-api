import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick, find } from 'lodash'
import stripe from '../lib/stripe'
import { env } from '../lib/env'
import newCardProducer from '../producers/newCardStripeProducer'
import slimpay from '../lib/slimpay'

const creditor = env.SLIMPAY_CREDITOR_KEY

const pickProps = data =>
  pick(data, [
    'token_type',
    'client_id',
    'stripe_token_id',
    'stripe_card_id',
    'slimpay_rum_id',
    'slimpay_token_id',
    'slimpay_rum_code',
    'offer_id'
  ])

export default class TokenService {
  constructor(tokenStore, clientStore, offerStore, addressStore) {
    this.tokenStore = tokenStore
    this.offerStore = offerStore
    this.clientStore = clientStore
    this.addressStore = addressStore
  }

  async findById(id) {
    BadRequest.assert(id, 'No id payload given')

    const token = await this.tokenStore.getById(id)
    NotFound.assert(token, `Token with id "${id}" not found`)

    return { token }
  }

  async create(body) {
    BadRequest.assert(body.token, 'No token payload given')
    BadRequest.assert(body.client, 'No token payload given')

    const token = body.token
    const client = body.client
    const offer = body.offer
    const clientPicked = pickProps(client)
    const tokenPicked = pickProps(token)
    const offerPicked = pickProps(offer)

    BadRequest.assert(clientPicked.client_id, 'client id is required')
    BadRequest.assert(tokenPicked, 'token object is required')
    BadRequest.assert(offerPicked, 'offer object is required')
    BadRequest.assert(tokenPicked.token_type, 'token type is required')
    BadRequest.assert(
      tokenPicked.token_type === 'stripe' && tokenPicked.stripe_token_id,
      'token stripe is required'
    )

    const tokenTest = await this.tokenStore.getByStripeTokenId(
      tokenPicked.stripe_token_id
    )
    Conflict.assert(
      !tokenTest,
      `Token with id "${tokenPicked.stripe_token_id}" already found`
    )

    const clientObject = await this.clientStore.getById(clientPicked.client_id)
    Conflict.assert(
      clientObject,
      `Client with id "${clientPicked.client_id}" not found`
    )

    const offerObject = await this.offerStore.getById(offerPicked.offer_id)
    Conflict.assert(
      offerObject,
      `Offer with id "${offerPicked.offer_id}" not found`
    )
    console.log(offerObject)
    const tokenStored = await this.tokenStore.create(tokenPicked)

    tokenStored.setClient(clientObject)
    let tokenSaved = {}

    try {
      tokenSaved = await this.createStripeCustomer(
        this,
        tokenStored,
        clientObject
      )

      //Durée libre && stripe payment
      if (!offerObject.time_limited && offerObject.payment_method === 2) {
        const producer = await newCardProducer({
          token: tokenSaved
        })
      }
    } catch (err) {
      BadRequest.assert(!err, err.message)
    }

    return {
      token: pick(tokenSaved, [
        'token_id',
        'token_type',
        'slimpay_rum_id',
        'slimpay_token_id',
        'slimpay_rum_code',
        'stripe_card_last4',
        'stripe_card_exp_month',
        'stripe_card_cvc_check',
        'stripe_card_brand',
        'stripe_card_country',
        'stripe_card_exp_year'
      ])
    }
  }

  async createStripeCustomer(t, tokenStored, client) {
    const stripeResponse = await stripe.customers
      .create({
        email: client.email,
        source: tokenStored.stripe_token_id
      })
      .then(async function(customer) {
        BadRequest.assert(customer, 'Stripe return empty customer object')
        BadRequest.assert(customer.sources, 'Stripe return empty source object')
        BadRequest.assert(
          customer.sources.data[0],
          'Stripe return empty card object'
        )

        const sourceStripe = customer.sources.data[0]

        tokenStored.stripe_card_id = sourceStripe.id
        tokenStored.stripe_customer_id = customer.id
        tokenStored.stripe_card_country = sourceStripe.country
        tokenStored.stripe_card_brand = sourceStripe.brand
        tokenStored.stripe_card_cvc_check = sourceStripe.cvc_check
        tokenStored.stripe_card_exp_month = sourceStripe.exp_month
        tokenStored.stripe_card_exp_year = sourceStripe.exp_year
        tokenStored.stripe_card_last4 = sourceStripe.last4

        const sourceStored = await tokenStored.save()

        return sourceStored
      })
    return stripeResponse
  }

  async updateAboweb(id, data) {
    BadRequest.assert(id, 'No id token payload given')

    const pickedToken = pick(data.token, ['aboweb_id'])
    BadRequest.assert(pickedToken, 'No token payload given')

    await this.findById(id)

    return this.tokenStore
      .update(id, pickedToken)
      .then(res => ({ updated: true, token: res[1][0] }))
      .catch(err =>
        Conflict.assert(
          err,
          `Token with id "${err.errors[0].message}" already found`
        )
      )
  }

  async createTokenSlimpay(clientId, addressId) {
    BadRequest.assert(clientId, 'No client payload given')
    BadRequest.assert(addressId, 'No address payload given')

    const clientObject = await this.clientStore.getById(clientId)
    Conflict.assert(clientObject, `Client with id "${clientId}" not found`)

    const addressObject = await this.addressStore.getById(addressId)
    Conflict.assert(addressObject, `Address with id "${addressId}" not found`)

    const askMandatSlimpay = {
      creditor: {
        reference: creditor
      },
      subscriber: {
        reference: clientObject.client_id
      },
      items: [
        {
          type: 'signMandate',
          mandate: {
            signatory: {
              familyName: addressObject.last_name,
              givenName: addressObject.first_name,
              telephone: addressObject.phone,
              email: clientObject.email,
              billingAddress: {
                street1: addressObject.address,
                postalCode: addressObject.postal_code,
                city: addressObject.city,
                country: addressObject.country
              }
            }
          }
        }
      ],
      started: true
    }

    const token = { token_type: 'slimpay' }
    const tokenStored = await this.tokenStore.create(token)
    tokenStored.setClient(clientObject)

    const iframe = await slimpay
      .signMandate(askMandatSlimpay)
      .then(async signMandate => {
        BadRequest.assert(!signMandate.code, signMandate.message)
        const dataToken = signMandate.body
        tokenStored.slimpay_token_id = dataToken.id

        // return dataToken._links['https://api.slimpay.net/alps#user-approval']
        return slimpay.getIframe(signMandate.traversal).then(iframeResult => {
          if (iframeResult.body && iframeResult.body.content) {
            return iframeResult.body.content
          }
        })
      })
    const tokenSaved = await tokenStored.save()
    NotFound.assert(tokenSaved, 'Token slimpay unavailable')
    NotFound.assert(iframe, 'Slimpay iframe unavailable')

    return { token: tokenSaved, iframe }
  }

  async validTokenSlimpay(tokenId) {
    BadRequest.assert(tokenId, 'Token id empty')
    const tokenObject = await this.tokenStore.getById(tokenId)
    NotFound.assert(tokenObject, `Token with id "${tokenId}" not found`)

    const slimpayObj = await slimpay
      .getOrders(tokenObject.slimpay_token_id)
      .then(async result => {
        if (result.body.state === 'closed.completed') {
          return slimpay.getMandate(result.traversal).then(mandateObject => {
            return slimpay
              .getBankAccount(mandateObject.traversal)
              .then(bankObject => {
                return {
                  bic: bankObject.body.bic,
                  iban: bankObject.body.iban,
                  rum: mandateObject.body.rum
                }
              })
          })
        }
        return { status: result.body.state }
      })

    NotFound.assert(!slimpayObj.status, 'Mandate not completed')

    tokenObject.slimpay_iban = slimpayObj.iban
    tokenObject.slimpay_bic = slimpayObj.bic
    tokenObject.slimpay_rum_id = slimpayObj.rum

    const tokenReturnSaved = await tokenObject.save()

    return { token: tokenReturnSaved }
  }
}
