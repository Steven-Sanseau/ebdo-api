import { NotFound, BadRequest, Conflict } from 'fejl'
import { pick } from 'lodash'
import Emailer from '../lib/emailer'
import path from 'path'

export default class LoginService {
  constructor(clientStore) {
    this.clientStore = clientStore
  }

  async sendCodeLogin(email) {
    const user = await this.clientStore.getByEmail(email)
    Conflict.assert(!user, `User with email "${email}" not found`)
    const template_path = path.resolve(
      './src/emails/codeConnexion.mjml.mustache'
    )

    const template_data = {
      ctatext: 'ME CONNECTER SUR EBDO',
      ctalink: 'https://ebdo-lejournal.com',
      code: 18726,
      passwordLessText: 'password less explications etc.....',
      homeLink: 'https://ebdo-subscribe-front-staging.herokuapp.com'
    }

    const send = await Emailer.sendMail(template_path, template_data, {
      to: email,
      from: 'contact@ebdo-lejournal.com',
      subject: 'Votre code temporaire de connexion à Ebdo'
    })
  }
}
