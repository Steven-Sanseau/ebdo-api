import { NotFound, BadRequest, Conflict } from 'fejl'
import _ from 'lodash'
import newSubscriptionProducer from '../producers/newSubscriptionProducer'

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
    offerStore
  ) {
    this.addressStore = addressStore
    this.checkoutStore = checkoutStore
  }

  async create(body) {
    BadRequest.assert(body.client, 'No client payload given')
    const pickedCheckout = pickProps(body.client)
    pickedCheckout.email = _.toLower(pickedCheckout.email.trim())
    BadRequest.assert(pickedCheckout.email, 'email is required')

    const client = await this.clientStore.getById(pickedCheckout.client_id)
    Conflict.assert(
      client,
      `Checkout with client "${pickedCheckout.client_id}" not found`
    )

    const adressInvoice = await this.addressStore.getByIdAndClientId(
      pickedCheckout.address_invoice_id,
      pickedCheckout.client_id
    )
    Conflict.assert(
      adressInvoice,
      `Checkout with adress invoice "${
        pickedCheckout.address_invoice_id
      }" not found`
    )

    const adressDelivery = await this.addressStore.getByIdAndClientId(
      pickedCheckout.address_invoice_id,
      pickedCheckout.client_id
    )
    Conflict.assert(
      adressDelivery,
      `Checkout with adress delivery "${
        pickedCheckout.address_delivery_id
      }" not found`
    )

    const token = await this.tokenStore.getByIdAndClientId(
      pickedCheckout.address_invoice_id,
      pickedCheckout.client_id
    )
    Conflict.assert(
      token,
      `Checkout with token "${pickedCheckout.token_id}" not found`
    )

    const offer = await this.offerStore.getById(pickedCheckout.offer_id)
    Conflict.assert(
      offer,
      `Checkout with offer "${pickedCheckout.offer_id}" not found`
    )

    const checkoutStored = await this.checkoutStore.create(pickedCheckout)
    const producer = await newClientProducer({ pickedCheckout })

    return checkoutStored
  }

  async makeStripeCharge() {}
}
