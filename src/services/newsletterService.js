import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

// Prefab assert function.
const assertEmail = BadRequest.makeAssert('No email given')

// Prevent overposting.
const pickProps = data => pick(data, ['email', 'name'])

export default class NewsletterService {
  constructor(newsletterStore) {
    this.newsletterStore = newsletterStore
  }

  async findByEmail(email) {
    assertEmail(email)

    return this.newsletterStore
      .getByEmail(email)
      .then(NotFound.makeAssert(`Newsletter with id "${email}" not found`))
  }

  async create(body) {
    BadRequest.assert(body.newsletter, 'No newsletter payload given')
    const newsletter = body.newsletter
    BadRequest.assert(newsletter.name, 'name is required')
    BadRequest.assert(newsletter.email, 'email is required')

    const newsletterTest = await this.newsletterStore.getByEmail(
      newsletter.email
    )
    Conflict.assert(
      !newsletterTest,
      `Newsletter with email "${newsletter.email}" already found`
    )
    return this.newsletterStore.create(pickProps(newsletter))
  }
}
