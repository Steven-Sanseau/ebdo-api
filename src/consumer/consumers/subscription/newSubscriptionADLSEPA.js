import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import AbowebService from '../../../services/abowebService'
import patchCheckout from '../../api/checkout'
import { env } from '../../../lib/env'

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const subscriptionADLSEPACreateConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_NEW_SUBSCRIPTION_ADL_SEPA
  }`,
  handleMessage: async (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage.Body)
      console.log('message received newSubscriptionADLSEPAConsumer')

      const url = `${env.ABO_WEB_URL}abmWeb?wsdl`
      const checkout = message.checkout
      const client = message.client
      const token = message.token
      const offer = message.offer
      const isDiffAddress = message.isDiffAddress

      let args = {
        clientTampon: {
          codeClient: client.aboweb_client_id,
          nePasModifierClient: 1,
          noCommandeBoutique: checkout.checkout_id,
          nom: client.last_name,
          email: client.email,
          prenom: client.first_name,
          iban: token.slimpay_iban,
          bic: token.slimpay_bic
        },
        lstLignePanierTampon: [
          {
            codeTarif: offer.aboweb_id,
            quantite: 1,
            modePaiement: 3,
            montantTtc: offer.price_ttc / 100,
            typeAdresseLiv: 0,
            noCommandeBoutique: checkout.checkout_id
          }
        ],
        refEditeur: env.ABO_WEB_REF_EDITEUR,
        refSociete: env.ABO_WEB_REF_SOCIETE
      }

      const soapClient = await new AbowebService().createSoapClient(url)
      soapClient.ABM_CREATION_FICHIER_ABM(args, function(err, result) {
        if (err) {
          console.log('aboweb failed', err)
        }

        if (result.return.result) {
          const codeCheckout = result.return.refAction

          return patchCheckout(checkout, codeCheckout)
            .then(function(parsedBody) {
              done()
            })
            .catch(function(err) {
              console.log('post failed', err)
            })
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  sqs: new AWS.SQS()
})

export default subscriptionADLSEPACreateConsumer
