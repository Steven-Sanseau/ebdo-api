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

      let args = {
        adresse: {
          typeAdresse: 1,
          codeClient: client.aboweb_id,
          nom: addressDelivery.last_name || null,
          prenom: addressDelivery.first_name || null,
          societe: addressDelivery.company || null,
          adresse1: addressDelivery.address_pre || null,
          adresse2: addressDelivery.address || null,
          adresse3: addressDelivery.address_post || null,
          cp: addressDelivery.postal_code || null,
          ville: addressDelivery.city || null,
          codeIsoPays: addressDelivery.country || null
        }
      }

      const soapClient = await new AbowebService().createSoapClient(url)

      soapClient.createOrUpdateAdresse(args, function(err, result) {
        if (err) {
          console.log('create new client card to aboweb failed', err.body)
          return null
        }

        console.log('result', result)
        const codeAddress = result.result

        return patchAddress(addressDelivery, codeAddress)
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

export default newAddressConsumer
