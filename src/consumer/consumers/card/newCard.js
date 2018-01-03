import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import soap from 'soap'
import crypto from 'crypto'
import { patchToken } from '../../api/token'
import { env } from '../../../lib/env'

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const newCardConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_NEW_CARD_STRIPE
  }`,
  handleMessage: (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage.Body)
      console.log('message received newCardConsumer')

      const url = `${env.ABO_WEB_URL}CarteBancaireService?wsdl`
      const token = message.token

      let args = {
        createCarteBancaire: {
          prestataire: 2,
          cbCode: token.stripe_customer_id,
          token: token.stripe_card_id,
          dateVal: `${token.stripe_card_exp_month}${
            token.stripe_card_exp_year
          }`,
          lastNumbers: token.stripe_card_last4
        }
      }

      soap.createClient(url, function(err, soapClient) {
        const sha1 = crypto.createHash('sha1')

        const wsSecurity = new soap.WSSecurity(
          env.ABO_WEB_LOGIN,
          sha1.update(env.ABO_WEB_KEY).digest('base64')
        )
        soapClient.setSecurity(wsSecurity)

        soapClient.createCarteBancaire(args, function(err, result) {
          if (err) {
            console.log('create new client card to aboweb failed', err.body)
            return null
          }

          const codeCard = result.codeCard

          return patchToken(token, codeCard)
            .then(function(parsedBody) {
              return done()
            })
            .catch(function(err) {
              console.log('post ebdo api new card aboweb id failed', err)
              return null
            })
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
