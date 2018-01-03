import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import soap from 'soap'
import crypto from 'crypto'
import { patchClient } from '../../api/client'
import { env } from '../../../lib/env'

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const subscriptionCreateConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_NEW_SUBSCRIPTION
  }`,
  handleMessage: (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage.Body)
      console.log('message received clientCreateConsumer')

      const url = `${env.ABO_WEB_URL}ClientService?wsdl`
      const client = message.client
      const addressDelivery = message.addressDelivery
      const addressInvoice = message.addressInvoice

      let args = {
        client: {
          typeClient: client.type_client,
          email: client.email,
          codeClient: client.aboweb_client_id || null,
          nom: addressDelivery.last_name || null,
          prenom: addressDelivery.first_name || null,
          origineAbm: client.source || null,
          societe: addressDelivery.company || null,
          adresse1: addressDelivery.address_pre || null,
          adresse2: addressDelivery.address || null,
          adresse3: addressDelivery.address_post || null,
          cp: addressDelivery.postal_code || null,
          ville: addressDelivery.city || null,
          codeIsoPays: addressDelivery.country || null
        }
      }

      soap.createClient(url, function(err, soapClient) {
        const sha1 = crypto.createHash('sha1')

        const wsSecurity = new soap.WSSecurity(
          env.ABO_WEB_LOGIN,
          sha1.update(env.ABO_WEB_KEY).digest('base64')
        )
        soapClient.setSecurity(wsSecurity)

        soapClient.findClientByEmail({ email: args.client.email }, function(
          errClientEmail,
          clientExistEmail
        ) {
          if (clientExistEmail.codeClient) {
            args.client.codeClient = clientExistEmail.codeClient
          }
        })

        soapClient.createOrUpdateClientEx(args, function(err, result) {
          if (err) {
            console.log('aboweb failed', err)
          }

          const codeClient = result.codeClient

          return patchClient(client, codeClient)
            .then(function(parsedBody) {
              done()
            })
            .catch(function(err) {
              console.log('post failed', err)
            })
        })
      })
    } catch (err) {
      console.log(err)
    }
  },
  sqs: new AWS.SQS()
})

export default subscriptionCreateConsumer
