import db from '../config/sequelize'
import { NotFound, BadRequest } from 'fejl'
import { pick } from 'lodash'

// Prefab assert function.
const assertId = BadRequest.makeAssert('No id given')

// Prevent overposting.
const pickProps = data => pick(data, ['title', 'completed'])

export default class NewsletterService {
  findAll(limit, offset) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Newsletter.findAll({ limit: limit, offset: offset }))
      } catch (e) {
        reject(e)
      }
    })
  }

  countAll() {
    return new Promise((resolve, reject) => {
      try {
        return resolve(db.Newsletter.count({}))
      } catch (e) {
        reject(e)
      }
    })
  }

  async findById(id) {
    assertId(id)

    return db.Newsletter.findById(id).then(
      NotFound.makeAssert(`Newsletter with id "${id}" not found`)
    )
  }

  create(newsletter) {
    BadRequest.assert(newsletter, 'No newsletter payload given')
    BadRequest.assert(newsletter.name, 'name is required')
    BadRequest.assert(newsletter.email, 'email is required')

    return db.Newsletter.build(pickProps(newsletter)).save()
  }

  update(id, newsletter) {
    return new Promise((resolve, reject) => {
      try {
        return resolve(
          db.Newsletter.update(newsletter, {
            where: { newsletter_id: id },
            returning: true
          })
        )
      } catch (e) {
        reject(e)
      }
    })
  }
}
