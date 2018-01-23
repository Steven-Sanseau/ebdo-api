import soap from 'soap'
import crypto from 'crypto'
import { BadRequest } from 'fejl'

import { env } from '../lib/env'

import newClientProducer from '../producers/newClientProducer'

export default class ConsumerService {
  constructor(clientStore, addressStore) {
    this.clientStore = clientStore
    this.addressStore = addressStore
  }

  async createProducerClientById(id) {
    const idParsed = parseInt(id)
    BadRequest.assert(Number.isInteger(idParsed), 'id must be a number')

    const client = await this.clientStore.getById(idParsed)

    const address = await this.addressStore.getByTypeAndClientId(
      'invoice',
      client.client_id
    )

    const producer = await newClientProducer({
      client: client,
      addressInvoice: address
    })

    return { result: true }
  }
}
