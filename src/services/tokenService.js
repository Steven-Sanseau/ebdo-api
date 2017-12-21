import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'
import stripe from '../lib/stripe'

const pickProps = data => pick(data, ['token_id', 'name'])

export default class TokenService {
  constructor(tokenStore) {
    this.tokenStore = tokenStore
  }

  async create(body) {
    BadRequest.assert(body.token, 'No token payload given')
    const token = body.token
    BadRequest.assert(token, 'is required')
    BadRequest.assert(token.tokenStripe, 'token stripe is required')

    // const tokenTest = await this.tokenStore.getByStripeId(token.token_id)
    // Conflict.assert(
    //   !tokenTest,
    //   `Token with id "${token.tokenStripe.id}" already found`
    // )

    const striperesponse = await this.createStripeCustomer(token.tokenStripe.id)
    console.log(striperesponse)
    const picked = pickProps(token)
    // return this.tokenStore.create(picked)
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
        stripe.charges.create({
          amount: 1000,
          currency: 'eur',
          customer: customer.id
        })
        stripe.charges.create({
          amount: 1500,
          currency: 'eur',
          customer: customer.id
        })
        stripe.charges.create({
          amount: 2000,
          currency: 'eur',
          customer: customer.id
        })
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
