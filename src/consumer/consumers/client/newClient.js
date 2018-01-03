import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import soap from 'soap'
import crypto from 'crypto'
import { patchClient } from '../../api/client'
import { env } from '../../../lib/env'

dotenv.config()

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const clientCreateConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_NEW_CLIENT
  }`,
  handleMessage: (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage.Body)
      console.log('message received clientCreateConsumer')

      const url = `${env.ABO_WEB_URL}ClientService?wsdl`
      const client = message.client
      const addressInvoice = message.addressInvoice

      let args = {}
      soap.createClient(url, function(err, soapClient) {
        const sha1 = crypto.createHash('sha1')

        const wsSecurity = new soap.WSSecurity(
          env.ABO_WEB_LOGIN,
          sha1.update(env.ABO_WEB_KEY).digest('base64')
        )
        soapClient.setSecurity(wsSecurity)

        soapClient.findClientByEmail({ email: client.email }, function(
          errClientEmail,
          clientExistEmail
        ) {
          //CREATE CLIENT
          args = {
            client: {
              typeClient: client.type_client,
              email: client.email,
              nom: addressInvoice.last_name || null,
              prenom: addressInvoice.first_name || null,
              origineAbm: client.source || null,
              societe: addressInvoice.company || null,
              adresse1: addressInvoice.address_pre || null,
              adresse2: addressInvoice.address || null,
              adresse3: addressInvoice.address_post || null,
              cp: addressInvoice.postal_code || null,
              ville: addressInvoice.city || null,
              codeIsoPays: addressInvoice.country || null
            }
          }
          if (
            !errClientEmail &&
            clientExistEmail.client &&
            clientExistEmail.client.codeClient
          ) {
            args.client.codeClient = clientExistEmail.client.codeClient
          }

          soapClient.createOrUpdateClientEx(args, function(err, result) {
            if (err) {
              console.log('aboweb failed', err)
            }

            const codeClient = result.codeClient

            return patchClient(client, codeClient)
              .then(function(parsedBody) {
                if (parsedBody.updated) {
                  done()
                }
              })
              .catch(function(err) {
                console.log('post failed', err)
              })
          })
        })
      })
    } catch (err) {
      console.log(err)
    }
  },
  sqs: new AWS.SQS()
})

export default clientCreateConsumer