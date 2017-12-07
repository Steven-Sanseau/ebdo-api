import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

const assertEmail = BadRequest.makeAssert('No email given')
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

    const picked = pickProps(newsletter)
    return this.newsletterStore.create(picked)
  }

  async update(email, data) {
    assertEmail(email)

    const newsletter = data.newsletter
    BadRequest.assert(newsletter, 'No newsletter payload given')

    await this.findByEmail(email)

    const picked = pickProps(newsletter)
    return this.newsletterStore.update(email, picked)
  }
}
