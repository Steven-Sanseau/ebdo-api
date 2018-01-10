import { env } from '../lib/env'
import Emailer from '@sendgrid/mail'

const options = {
  auth: {
    api_key: env.SENDGRID_API_KEY
  }
}

Emailer.setApiKey(env.SENDGRID_API_KEY)
Emailer.setSubstitutionWrappers('{{', '}}')
export default Emailer
