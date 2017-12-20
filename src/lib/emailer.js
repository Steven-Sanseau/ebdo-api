import Client from 'node-mjml-mustache-nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'
import { env } from '../lib/env'

const options = {
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
}

const config = {
  default_from: 'contact@ebdo-lejournal.com',
  cache: false,
  smtp: sgTransport(options)
}

const Emailer = new Client(config)

export default Emailer
