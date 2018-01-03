import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import soap from 'soap'
import crypto from 'crypto'
import patchCheckout from '../../api/checkout'
import { env } from '../../../lib/env'

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const subscriptionADLCBCreateConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_NEW_SUBSCRIPTION_ADL_CB
  }`,
  handleMessage: (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage.Body)
      console.log('message received newSubscriptionADLCBConsumer')

      const url = `${env.ABO_WEB_URL}abmWeb?wsdl`
      const checkout = message.checkout
      const client = message.client
      const token = message.token
      const offer = message.offer

      let args = {
        clientTampon: {
          codeClient: client.aboweb_client_id,
          nePasModifierClient: 1,
          noCommandeBoutique: checkout.checkout_id,
          refCarteBancaire: token.aboweb_id
        },
        lstLignePanierTampon: [
          {
            codeTarif: offer.aboweb_id,
            quantite: 1,
            modePaiement: 6,
            montantTtc: offer.price_ttc,
            typeAdresseLiv: 0
          }
        ],
        refEditeur: env.ABO_WEB_REF_EDITEUR,
        refSociete: env.ABO_WEB_REF_SOCIETE
      }

      soap.createClient(url, function(err, soapClient) {
        const sha1 = crypto.createHash('sha1')

        const wsSecurity = new soap.WSSecurity(
          env.ABO_WEB_LOGIN,
          sha1.update(env.ABO_WEB_KEY).digest('base64')
        )
        soapClient.setSecurity(wsSecurity)

        soapClient.ABM_CREATION_FICHIER_ABM(args, function(err, result) {
          if (err) {
            console.log('aboweb failed', err)
          }

          const codeCheckout = result.codeCheckout

          return patchCheckout(checkout, codeCheckout)
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

export default subscriptionADLCBCreateConsumer