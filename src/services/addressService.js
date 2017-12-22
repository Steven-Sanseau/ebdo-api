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
    'type_address'
  ])

export default class AddressService {
  constructor(addressStore, clientStore) {
    this.addressStore = addressStore
    this.clientStore = clientStore
  }

  async findById(id) {
    assertId(id)
    const idParsed = parseInt(id)
    BadRequest.assert(Number.isInteger(idParsed), 'id must be a number')

    const address = this.addressStore.getById(idParsed)
    NotFound.assert(address, `Address with id "${id}" not found`)

    return address
  }

  async create(body) {
    BadRequest.assert(body.address, 'No address payload given')
    const address = body.address
    const client = body.client
    BadRequest.assert(address.address, 'address is required')
    BadRequest.assert(address.city, 'city is required')
    BadRequest.assert(address.postal_code, 'Postal Code is required')
    BadRequest.assert(address.first_name, 'First Name is required')
    BadRequest.assert(address.last_name, 'Last Name is required')
    BadRequest.assert(address.country, 'Country is required')
    BadRequest.assert(client.client_id, 'Client id is required')

    const clientStored = await this.clientStore.getById(client.client_id)
    NotFound.assert(clientStored, `client "${client.client_id}" not found`)

    const picked = pickProps(address)
    const addressStored = await this.addressStore.create(picked)

    addressStored.setClient(clientStored)

    return { address: addressStored }
  }

  async update(id, data) {
    assertId(id)

    const address = data.address
    BadRequest.assert(address, 'No address payload given')

    await this.findById(id)

    const picked = pickProps(address)

    const addressUpdated = await this.addressStore.update(id, picked)

    return { updated: true, address: addressUpdated[1][0] }
  }
}
