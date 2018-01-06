import { NotFound, BadRequest, Conflict } from 'fejl'
import _ from 'lodash'
import newClientProducer from '../producers/newClientProducer'

const assertId = BadRequest.makeAssert('No id given')
const pickProps = data =>
  _.pick(data, [
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

    clientStored.first_name = addressStored.first_name
    clientStored.last_name = addressStored.last_name
    const clientUpdated = await clientStored.save()

    //SEND ABOWEB client info
    if (addressStored.type_address === 'invoice') {
      const producer = await newClientProducer({
        client: clientStored,
        addressInvoice: addressStored
      })
    }

    return { address: addressStored, client: clientUpdated }
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
      clientStored.first_name = addressUpdated.first_name
      clientStored.last_name = addressUpdated.last_name
      const clientUpdated = await clientStored.save()

      const producer = await newClientProducer({
        client: clientUpdated,
        addressInvoice: addressUpdated
      })
      return { updated: true, address: addressUpdated, client: clientUpdated }
    }

    return { updated: true, address: addressUpdated }
  }

  async updateAboweb(id, data) {
    BadRequest.assert(id, 'No id address payload given')

    const pickedAddress = _.pick(data.address, ['aboweb_address_id'])
    BadRequest.assert(
      pickedAddress.aboweb_address_id,
      'No aboweb id payload given'
    )

    const addressObject = await this.findById(id)

    return this.addressStore
      .update(id, pickedAddress)
      .then(res => ({ updated: true, address: res[1][0] }))
      .catch(err =>
        Conflict.assert(
          err,
          `Address "${err.errors[0].message}" is unavailable to update`
        )
      )
  }
}
