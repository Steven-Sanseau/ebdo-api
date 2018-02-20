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
    NotFound.assert(
      user,
      "Cette adresse est incorrecte ou n'est pas reliée à un abonnement"
    )

    let code = ''
    if (
      user.login_code_created_at &&
      (new Date() - user.login_code_created_at) / (1000 * 60) < 5
    ) {
      code = user.login_code
    } else {
      // Code between 1000 & 9999
      code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
      user.update({
        login_code: code,
        login_code_created_at: new Date()
      })
    }

    const mail = await this.sendMailCodeLogin(code, user)
    return { result: true }
  }

  async sendMailCodeLogin(code, user) {
    Emailer.send({
      to: {
        email: user.email,
        name: user.first_name
          ? `${user.first_name} ${user.last_name}`
          : user.email
      },
      from: 'Ebdo <contact+login@ebdo-lejournal.com>',
      category: 'login_code',
      templateId: '823b211e-edc4-4829-9b61-c9a9f9c1cc09',
      substitutions: {
        login_code: code,
        first_name: user.first_name || '',
        website_url: env.FRONT_URL,
        subject: `👉 ${code} - Votre code de connexion à ebdo-lejournal.com`
      }
    }).then(() => {
      message: 'email send'
    })
  }

  async getJwt(email, code) {
    BadRequest.assert(code, 'Code empty')
    BadRequest.assert(email, 'Email empty empty')
    const user = await this.clientStore.getByEmailAndCode(email, code)
    NotFound.assert(user, 'Invalid code')

    return {
      token: Jwt.sign(
        {
          client_id: user.client_id,
          aboweb_client_id: user.aboweb_client_id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        env.JWT_PRIVATE_KEY
      )
    }
  }
}
