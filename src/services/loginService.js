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

    return await this.sendMailCodeLogin(code, user)
  }

  async sendMailCodeLogin(code, user) {
    const msg = await Emailer.message('login', async function(err, msg) {
      await msg.sendMail({
        to: user.email,
        login_code: code,
        first_name: user.first_name || null,
        website_url: env.FRONT_URL
      })
    })
  }

  async getJwt(email, code) {
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
