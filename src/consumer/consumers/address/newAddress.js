import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import { patchAddress } from '../../api/address'
import { env } from '../../../lib/env'
import AbowebService from '../../../services/abowebService'
import { getAbowebIdClient } from '../../api/client'

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const newAddressConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_NEW_ADDRESS
  }`,
  handleMessage: async (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage.Body)
      console.log('message received newAddressConsumer')

      const url = `${env.ABO_WEB_URL}AdresseService?wsdl`
      const addressDelivery = message.addressDelivery
      const client = message.client

      getAbowebIdClient(client.client_id).then(async function(parsedBody) {
        if (parsedBody.client.aboweb_client_id) {
          client.aboweb_client_id = parsedBody.client.aboweb_client_id

          let args = {
            adresse: {
              typeAdresse: 1,
              refAdresse: addressDelivery.aboweb_id || null,
              codeClient: client.aboweb_client_id,
              nom: addressDelivery.last_name,
              prenom: addressDelivery.first_name,
              telephone: addressDelivery.phone,
              societe: addressDelivery.company,
              adresse1: addressDelivery.address_pre,
              adresse2: addressDelivery.address,
              adresse3: addressDelivery.address_post
                ? addressDelivery.address_post.substring(0, 40)
                : '',
              cp: addressDelivery.postal_code,
              ville: addressDelivery.city,
              codeIsoPays: addressDelivery.country
            }
          }
          console.log('adress', args)
          const soapClient = await new AbowebService().createSoapClient(url)

          soapClient.createOrUpdateAdresseEx(args, function(err, result) {
            if (err) {
              console.log('create new client card to aboweb failed', err.body)
              done(err)
            }

            const codeAddress = result.refAdresse

            patchAddress(addressDelivery, codeAddress)
              .then(function(parsedBody) {
                done()
              })
              .catch(function(err) {
                console.log('post ebdo api new card aboweb id failed', err)
                done(err)
              })
          })
        }
      })
    } catch (err) {
      console.log(err)
      done(err)
    }
  },
  sqs: new AWS.SQS()
})

export default newAddressConsumer
