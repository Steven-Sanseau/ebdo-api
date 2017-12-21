import { NotFound, BadRequest, TooManyRequests } from 'fejl'
import { pick } from 'lodash'
import Jwt from 'jsonwebtoken'
import path from 'path'

import { env } from '../lib/env'
import Emailer from '../lib/emailer'

export default class LoginService {
  constructor(clientStore) {
    this.clientStore = clientStore
  }

  async sendCodeLogin(email) {
    BadRequest.assert(email)
    const user = await this.clientStore.getByEmail(email)
    NotFound.assert(user, 'User not found')

    if (
      user.login_code_created_at &&
      (new Date() - user.login_code_created_at) / (1000 * 60) < 5
    ) {
      TooManyRequests.makeAssert('Bad code login')
    }

    // Code between 1000 & 9999
    const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    user.update({
      login_code: code,
      login_code_created_at: new Date()
    })

    const emailSend = await this.sendMailCodeLogin(code, email)

    return emailSend
  }

  async sendMailCodeLogin(code, email) {
    const template_path = path.resolve(
      './src/emails/codeConnexion.mjml.mustache'
    )
    const template_data = {
      ctatext: 'ME CONNECTER SUR EBDO',
      ctalink: 'https://ebdo-lejournal.com',
      code,
      passwordLessText: 'password less explications etc.....',
      homeLink: 'https://ebdo-subscribe-front-staging.herokuapp.com'
    }

    const send = await Emailer.sendMail(template_path, template_data, {
      to: email,
      from: 'contact@ebdo-lejournal.com',
      subject: 'Votre code temporaire de connexion à Ebdo'
    })
    return send
  }

  async getJwt(email, code) {
    const user = await this.clientStore.getByEmailAndCode(email, code)
    NotFound.assert(user, 'Invalid code')

    return {
      token: Jwt.sign(
        { email: user.email, date: new Date() },
        env.JWT_PRIVATE_KEY
      )
    }
  }
}
