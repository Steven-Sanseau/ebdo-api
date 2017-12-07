import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

const assertEmail = BadRequest.makeAssert('No email given')
const pickProps = data => pick(data, ['email', 'name'])

export default class TokenService {
  constructor(tokenStore) {
    this.tokenStore = tokenStore
  }

  async findByEmail(email) {
    assertEmail(email)

    return this.tokenStore
      .getByEmail(email)
      .then(NotFound.makeAssert(`Token with email "${email}" not found`))
  }

  async create(body) {
    BadRequest.assert(body.token, 'No token payload given')
    const token = body.token
    BadRequest.assert(token.email, 'email is required')

    const tokenTest = await this.tokenStore.getByEmail(token.email)
    Conflict.assert(
      !tokenTest,
      `Token with email "${token.email}" already found`
    )

    const picked = pickProps(token)
    return this.tokenStore.create(picked)
  }

  async update(email, data) {
    assertEmail(email)

    const token = data.token
    BadRequest.assert(token, 'No token payload given')

    await this.findByEmail(email)

    const picked = pickProps(token)
    return this.tokenStore.update(email, picked)
  }
}
