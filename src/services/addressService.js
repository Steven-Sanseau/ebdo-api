import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

const assertId = BadRequest.makeAssert('No id given')
const pickProps = data =>
  pick(data, [
    'last_name',
    'first_name',
    'postal_code',
    'city',
    'address',
    'civility',
    'country',
    'phone',
    'client_id',
    'type_address'
  ])

export default class AddressService {
  constructor(addressStore) {
    this.addressStore = addressStore
  }

  async findById(id) {
    assertId(id)
    const idParsed = parseInt(id)
    BadRequest.assert(Number.isInteger(idParsed), 'id must be a number')

    return this.addressStore
      .getById(idParsed)
      .then(NotFound.makeAssert(`Address with id "${id}" not found`))
  }

  async create(body) {
    BadRequest.assert(body.address, 'No address payload given')
    const address = body.address
    BadRequest.assert(address.address, 'address is required')
    BadRequest.assert(address.city, 'city is required')
    BadRequest.assert(address.postal_code, 'Postal Code is required')
    BadRequest.assert(address.first_name, 'First Name is required')
    BadRequest.assert(address.last_name, 'Last Name is required')
    BadRequest.assert(address.country, 'Country is required')

    const picked = pickProps(address)
    return this.addressStore.create(picked)
  }

  async update(id, data) {
    assertId(id)

    const address = data.address
    BadRequest.assert(address, 'No address payload given')

    await this.findById(id)

    const picked = pickProps(address)

    return this.addressStore.update(id, picked).then(res => {
      return { updated: true, address: res[1][0] }
    })
  }
}
