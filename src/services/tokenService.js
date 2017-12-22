import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'
import stripe from '../lib/stripe'

const pickProps = data =>
  pick(data, [
    'token_type',
    'client_id',
    'stripe_token_id',
    'stripe_customer_id',
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

    return { token: tokenStored }
  }

  async createStripeCustomer(token) {
    const stripeResponse = await stripe.customers
      .create({
        email: 'steven.sanseau@gmail.com',
        source: token
      })
      .then(function(customer) {
        // YOUR CODE: Save the customer ID and other info in a database for later.
        console.log('customeer', customer)
        // stripe.charges.create({
        //   amount: 1000,
        //   currency: 'eur',
        //   customer: customer.id
        // })
        // stripe.charges.create({
        //   amount: 1500,
        //   currency: 'eur',
        //   customer: customer.id
        // })
        // stripe.charges.create({
        //   amount: 2000,
        //   currency: 'eur',
        //   customer: customer.id
        // })
      })
      .then(function(charge) {
        console.log('customeer', charge)
      })
    return stripeResponse
  }

  async chargeCard(customerId) {
    const stripeCharge = await stripe.charges.create({
      amount: 1500,
      currency: 'eur',
      customer: customerId
    })
    return stripeCharge
  }
}
