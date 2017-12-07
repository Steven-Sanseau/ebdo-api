import db from '../config/sequelize'
import env from '../lib/env'
import Emailer from '../lib/emailer'
import path from 'path'

export default class LoginService {
  sendCodeLogin(email) {
    return new Promise((resolve, reject) => {
      db.Client.findOne({ where: { email: email } })
        .catch(err => {
          reject(err)
        })
        .then(user => {
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

          Emailer.sendMail(template_path, template_data, {
            to: user.email,
            from: 'contact@ebdo-lejournal.com',
            subject: 'Votre code temporaire de connexion à Ebdo'
          }).then(
            function(infos) {
              resolve(infos)
            },
            function(err) {
              reject(err)
            }
          )
        })
    })
  }
}
