import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

const assertEmail = BadRequest.makeAssert('No email given')
const pickProps = data =>
  pick(data, ['monthly_price_ttc', 'is_gift', 'time_limited', 'duration'])

export default class OfferService {
  constructor(offerStore) {
    this.offerStore = offerStore
  }

  async findOffer(duration, price, gift, country, payment) {
    BadRequest.assert(duration, 'No duration for offer payload given')
    BadRequest.assert(price, 'No price for offer payload given')
    BadRequest.assert(gift, 'No gift for offer payload given')
    BadRequest.assert(country, 'No country for offer payload given')
    BadRequest.assert(payment, 'No payment for offer payload given')

    const offer = {
      monthly_price_ttc: Number(price),
      is_gift: gift === 'true',
      time_limited: Number(duration) !== 0,
      duration: Number(duration),
      country_shipping: String(country).toUpperCase(),
      payment_method: Number(payment)
    }
    const offerStored = await this.offerStore.getOfferFromParams(offer)
    NotFound.assert(offerStored, `Offer not found`)

    return { offer: offerStored }
  }

  async findAll() {
    return this.offerStore.getAll()
  }
}
