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

      const cardMonth =
        String(token.stripe_card_exp_month).length === 1
          ? `0${String(token.stripe_card_exp_month)}`
          : String(token.stripe_card_exp_month)
      const cardYear = String(token.stripe_card_exp_year).substring(2)

      let args = {
        prestataire: '2',
        cbCode: token.stripe_card_id,
        token: token.stripe_customer_id,
        dateVal: cardYear + cardMonth,
        lastNumbers: token.stripe_card_last4
      }

      console.log('card', args)
      const soapClient = await new AbowebService().createSoapClient(url)

      soapClient.createCarteBancaire(args, function(err, result) {
        if (err) {
          console.log('create new client card to aboweb failed', err.body)a
        }

        const codeCard = result.result

        patchToken(token, codeCard)
          .then(function(parsedBody) {
            done()
          })
          .catch(function(err) {
            console.log('post ebdo api new card aboweb id failed', err)
          })
      })
    } catch (err) {
      console.log(err)
    }
  },
  sqs: new AWS.SQS()
})

export default newCardConsumer
