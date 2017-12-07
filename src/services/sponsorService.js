import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'

const assertEmail = BadRequest.makeAssert('No email given')
const pickProps = data => pick(data, ['email', 'name'])

export default class SponsorService {
  constructor(sponsorStore) {
    this.sponsorStore = sponsorStore
  }

  async findByEmail(email) {
    assertEmail(email)

    return this.sponsorStore
      .getByEmail(email)
      .then(NotFound.makeAssert(`Sponsor with email "${email}" not found`))
  }

  async create(body) {
    BadRequest.assert(body.sponsor, 'No sponsor payload given')
    const sponsor = body.sponsor
    BadRequest.assert(sponsor.email, 'email is required')

    const sponsorTest = await this.sponsorStore.getByEmail(sponsor.email)
    Conflict.assert(
      !sponsorTest,
      `Sponsor with email "${sponsor.email}" already found`
    )

    const picked = pickProps(sponsor)
    return this.sponsorStore.create(picked)
  }

  async update(email, data) {
    assertEmail(email)

    const sponsor = data.sponsor
    BadRequest.assert(sponsor, 'No sponsor payload given')

    await this.findByEmail(email)

    const picked = pickProps(sponsor)
    return this.sponsorStore.update(email, picked)
  }
}
