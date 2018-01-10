// import MustacheMailer from 'mustache-mailer'
// import sgTransport from 'nodemailer-sendgrid-transport'
import { env } from '../lib/env'
// import path from 'path'
import Emailer from '@sendgrid/mail'
const options = {
  auth: {
    api_key: env.SENDGRID_API_KEY
  }
}
//
// const Emailer = new MustacheMailer({
//   transport: sgTransport(options),
//   templateDir: path.resolve('./src/emails/template')
// })
Emailer.setApiKey(env.SENDGRID_API_KEY)
Emailer.setSubstitutionWrappers('{{', '}}')
export default Emailer
