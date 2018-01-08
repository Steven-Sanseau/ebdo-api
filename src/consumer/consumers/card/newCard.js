import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import { patchToken } from '../../api/token'
import { env } from '../../../lib/env'
import AbowebService from '../../../services/abowebService'

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const newCardConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_NEW_CARD_STRIPE
  }`,
  handleMessage: async (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage.Body)
      console.log('message received newCardConsumer')

      const url = `${env.ABO_WEB_URL}CarteBancaireService?wsdl`
      const token = message.token

      let args = {
        prestataire: '2',
        cbCode: String(token.stripe_card_id),
        token: String(token.stripe_customer_id),
        dateVal: String(
          token.stripe_card_exp_month + String(token.stripe_card_exp_year)
        ).substring(2),
        lastNumbers: String(token.stripe_card_last4)
      }

      const soapClient = await new AbowebService().createSoapClient(url)

      soapClient.createCarteBancaire(args, function(err, result) {
        if (err) {
          console.log('create new client card to aboweb failed', err.body)
          return null
        }

        const codeCard = result.result

        return patchToken(token, codeCard)
          .then(function(parsedBody) {
            return done()
          })
          .catch(function(err) {
            console.log('post ebdo api new card aboweb id failed', err)
            return null
          })
      })
    } catch (err) {
      console.log(err)
      return null
    }
  },
  sqs: new AWS.SQS()
})

export default newCardConsumer
