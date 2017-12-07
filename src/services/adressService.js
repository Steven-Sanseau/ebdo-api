import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

const assertEmail = BadRequest.makeAssert('No email given')
const pickProps = data => pick(data, ['email', 'name'])

export default class AdressService {
  constructor(adressStore) {
    this.adressStore = adressStore
  }

  async findByEmail(email) {
    assertEmail(email)

    return this.adressStore
      .getByEmail(email)
      .then(NotFound.makeAssert(`Adress with email "${email}" not found`))
  }

  async create(body) {
    BadRequest.assert(body.adress, 'No adress payload given')
    const adress = body.adress
    BadRequest.assert(adress.email, 'email is required')

    const adressTest = await this.adressStore.getByEmail(adress.email)
    Conflict.assert(
      !adressTest,
      `Adress with email "${adress.email}" already found`
    )

    const picked = pickProps(adress)
    return this.adressStore.create(picked)
  }

  async update(email, data) {
    assertEmail(email)

    const adress = data.adress
    BadRequest.assert(adress, 'No adress payload given')

    await this.findByEmail(email)

    const picked = pickProps(adress)
    return this.adressStore.update(email, picked)
  }
}
