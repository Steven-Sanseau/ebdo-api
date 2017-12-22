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

    const getCustomerStripeId = await this.createStripeCustomer(
      tokenStored.stripe_token_id,
      clientObject
    )

    tokenStored.stripe_customer_id = getCustomerStripeId
    const tokensaved = await tokenStored.save()
    return {
      token: pick(tokensaved, [
        'token_id',
        'token_type',
        'client_id',
        'stripe_token_id',
        'stripe_card_id',
        'slimpay_rum_id',
        'slimpay_token_id',
        'slimpay_rum_code'
      ])
    }
  }

  async createStripeCustomer(token, client) {
    const stripeResponse = await stripe.customers
      .create({
        email: client.email,
        source: token
      })
      .then(function(customer) {
        return customer.id
      })
    return stripeResponse
  }
}
