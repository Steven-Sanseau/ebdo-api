import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

const assertId = BadRequest.makeAssert('No id given')
const pickProps = data =>
  pick(data, ['last_name', 'first_name', 'postal_code', 'city', 'adress'])

export default class AdressService {
  constructor(adressStore) {
    this.adressStore = adressStore
  }

  async findById(id) {
    assertId(id)
    const idParsed = parseInt(id)
    BadRequest.assert(Number.isInteger(idParsed), 'id must be a number')

    return this.adressStore
      .getById(idParsed)
      .then(NotFound.makeAssert(`Adress with id "${id}" not found`))
  }

  async create(body) {
    BadRequest.assert(body.adress, 'No adress payload given')
    const adress = body.adress
    BadRequest.assert(adress.adress, 'adress is required')
    BadRequest.assert(adress.city, 'city is required')
    BadRequest.assert(adress.postal_code, 'Postal Code is required')
    BadRequest.assert(adress.first_name, 'First Name is required')
    BadRequest.assert(adress.last_name, 'Last Name is required')

    const picked = pickProps(adress)
    return this.adressStore.create(picked)
  }

  async update(id, data) {
    assertId(id)

    const adress = data.adress
    BadRequest.assert(adress, 'No adress payload given')

    await this.findById(id)

    const picked = pickProps(adress)
    return this.adressStore.update(id, picked)
  }
}
