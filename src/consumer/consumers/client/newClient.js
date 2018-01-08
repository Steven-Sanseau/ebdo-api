import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import { patchClient } from '../../api/client'
import { env } from '../../../lib/env'
import AbowebService from '../../../services/abowebService'

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const clientCreateConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_NEW_CLIENT
  }`,
  handleMessage: async (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage.Body)
      console.log('message received clientCreateConsumer')

      const url = `${env.ABO_WEB_URL}ClientService?wsdl`
      const client = message.client
      const addressInvoice = message.addressInvoice

      let args = {}
      const soapClient = await new AbowebService().createSoapClient(url)

      soapClient.findClientByEmail({ email: client.email }, function(
        errClientEmail,
        clientExistEmail
      ) {
        //CREATE CLIENT
        args = {
          client: {
            typeClient: client.type_client,
            email: client.email,
            nom: addressInvoice.last_name,
            telephone: addressInvoice.phone,
            prenom: addressInvoice.first_name,
            origineAbm: client.source,
            societe: addressInvoice.company,
            adresse1: addressInvoice.address_pre,
            adresse2: addressInvoice.address,
            adresse3: addressInvoice.address_post,
            cp: addressInvoice.postal_code,
            ville: addressInvoice.city,
            codeIsoPays: addressInvoice.country
          }
        }

        console.log('client', args)
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
          console.log(result)

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
    } catch (err) {
      console.log(err)
    }
  },
  sqs: new AWS.SQS()
})

export default clientCreateConsumer
