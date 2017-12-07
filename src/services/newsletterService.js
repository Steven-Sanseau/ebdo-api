import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

// Prefab assert function.
const assertEmail = BadRequest.makeAssert('No email given')

export default class NewsletterService {
  constructor(newsletterStore) {
    this.newsletterStore = newsletterStore
  }

  async find(params) {
    return this.todoStore.find(params)
  }

  async get(id) {
    assertId(id)
    // If `todoStore.get()` returns a falsy value, we throw a
    // NotFound error with the specified message.
    return this.todoStore
      .get(id)
      .then(NotFound.makeAssert(`Todo with id "${id}" not found`))
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

    // Prevent overposting.
    const pickProps = data => pick(data, ['email', 'name'])

    return this.newsletterStore.create(pickProps(newsletter))
  }

  async update(id, data) {
    assertId(id)
    BadRequest.assert(data, 'No todo payload given')

    // Make sure the todo exists by calling `get`.
    await this.get(id)

    // Prevent overposting.
    const picked = pickProps(data)
    return this.todoStore.update(id, picked)
  }
}
