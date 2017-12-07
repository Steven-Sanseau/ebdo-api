import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

const assertEmail = BadRequest.makeAssert('No email given')
const pickProps = data => pick(data, ['email', 'name'])

export default class ClientService {
  constructor(clientStore) {
    this.clientStore = clientStore
  }

  async findByEmail(email) {
    assertEmail(email)

    return this.clientStore
      .getByEmail(email)
      .then(NotFound.makeAssert(`Client with email "${email}" not found`))
  }

  async create(body) {
    BadRequest.assert(body.client, 'No client payload given')
    const client = body.client
    BadRequest.assert(client.email, 'email is required')

    const clientTest = await this.clientStore.getByEmail(client.email)
    Conflict.assert(
      !clientTest,
      `Client with email "${client.email}" already found`
    )

    const picked = pickProps(client)
    return this.clientStore.create(picked)
  }

  async update(email, data) {
    assertEmail(email)

    const client = data.client
    BadRequest.assert(client, 'No client payload given')

    await this.findByEmail(email)

    const picked = pickProps(client)
    return this.clientStore.update(email, picked)
  }
}
