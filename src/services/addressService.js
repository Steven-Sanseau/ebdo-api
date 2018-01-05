import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'
import newClientProducer from '../producers/newClientProducer'

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
    'type_address',
    'address_equal'
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

    const pickedAddress = pickProps(address)
    pickedAddress.client_id = clientStored.client_id
    const addressStored = await this.addressStore.create(pickedAddress)

    //SEND ABOWEB client info
    if (addressStored.type_address === 'invoice') {
      const producer = await newClientProducer({
        client: clientStored,
        addressInvoice: addressStored
      })
    }

    return { address: addressStored }
  }

  async update(id, data) {
    assertId(id)

    const address = data.address
    BadRequest.assert(address, 'No address payload given')

    await this.findById(id)

    const picked = pickProps(address)

    let addressUpdated = await this.addressStore.update(id, picked)

    addressUpdated = addressUpdated[1][0]
    //SEND ABOWEB client info
    if (addressUpdated.type_address === 'invoice') {
      const clientStored = await this.clientStore.getById(
        addressUpdated.client_id
      )
      NotFound.assert(
        clientStored,
        `Checkout with client "${addressUpdated.client_id}" not found`
      )

      const producer = await newClientProducer({
        client: clientStored,
        addressInvoice: addressUpdated
      })
    }

    return { updated: true, address: addressUpdated }
  }
}
