import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

const assertEmail = BadRequest.makeAssert('No email given')
const pickProps = data => pick(data, ['email', 'name'])

export default class OfferService {
  constructor(offerStore) {
    this.offerStore = offerStore
  }

  async findAll() {
    return this.offerStore.getAll()
  }

  async findByEmail(email) {
    assertEmail(email)

    return this.offerStore
      .getByEmail(email)
      .then(NotFound.makeAssert(`Offer with email "${email}" not found`))
  }

  async create(body) {
    BadRequest.assert(body.offer, 'No offer payload given')
    const offer = body.offer
    BadRequest.assert(offer.email, 'email is required')

    const offerTest = await this.offerStore.getByEmail(offer.email)
    Conflict.assert(
      !offerTest,
      `Offer with email "${offer.email}" already found`
    )

    const picked = pickProps(offer)
    return this.offerStore.create(picked)
  }

  async update(email, data) {
    assertEmail(email)

    const offer = data.offer
    BadRequest.assert(offer, 'No offer payload given')

    await this.findByEmail(email)

    const picked = pickProps(offer)
    return this.offerStore.update(email, picked)
  }
}
