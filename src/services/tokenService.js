import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'
import stripe from '../lib/stripe'

const pickProps = data =>
  pick(data, [
    'token_type',
    'client_id',
    'stripe_token_id',
    'stripe_card_id',
    'slimpay_rum_id',
    'slimpay_token_id',
    'slimpay_rum_code'
  ])

export default class TokenService {
  constructor(tokenStore, clientStore) {
    this.tokenStore = tokenStore
    this.clientStore = clientStore
  }

  async create(body) {
    BadRequest.assert(body.token, 'No token payload given')
    BadRequest.assert(body.client, 'No token payload given')

    const token = body.token
    const client = body.client
    const clientPicked = pickProps(client)
    const tokenPicked = pickProps(token)

    BadRequest.assert(clientPicked.client_id, 'client id is required')
    BadRequest.assert(tokenPicked, 'token object is required')
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

    const tokenStored = await this.tokenStore.create(tokenPicked)

    tokenStored.setClient(clientObject)
    let tokenSaved = {}

    try {
      tokenSaved = await this.createStripeCustomer(
        this,
        tokenStored,
        clientObject
      )
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
}
