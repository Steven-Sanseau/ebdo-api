import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import AbowebService from '../../../services/abowebService'
import patchCheckout from '../../api/checkout'

import { getAbowebIdClient } from '../../api/client'
import { getAbowebIdToken } from '../../api/token'
import { env } from '../../../lib/env'

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const subscriptionDDCBCreateConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_NEW_SUBSCRIPTION_DD_CB
  }`,
  handleMessage: async (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage.Body)
      console.log('message received subscriptionDDCBCreateConsumer')

      const url = `${env.ABO_WEB_URL}abmWeb?wsdl`
      const client = message.client
      const checkout = message.checkout
      const offer = message.offer
      getAbowebIdClient(client.client_id)
        .then(async function(parsedBody) {
          if (parsedBody.client.aboweb_client_id) {
            client.aboweb_client_id = parsedBody.client.aboweb_client_id

            getAbowebIdToken(token.token_id)
              .then(async function(parsedBody) {
                if (parsedBody.token.aboweb_id) {
                  token.aboweb_id = parsedBody.token.aboweb_id

                  let args = {
                    clientTampon: {
                      codeClient: client.aboweb_client_id,
                      nom: client.last_name,
                      email: client.email,
                      prenom: client.first_name,
                      nePasModifierClient: 1,
                      noCommandeBoutique: checkout.checkout_id
                    },
                    lstLignePanierTampon: [
                      {
                        codeTarif: offer.aboweb_id,
                        quantite: 1,
                        modePaiement: 2,
                        montantTtc: offer.price_ttc / 100,
                        typeAdresseLiv: 0,
                        noCommandeBoutique: checkout.checkout_id,
                        titre: offer.name.substring(0, 39)
                      }
                    ],
                    refEditeur: env.ABO_WEB_REF_EDITEUR,
                    refSociete: env.ABO_WEB_REF_SOCIETE
                  }

                  console.log('DDCB', args)

                  const soapClient = await new AbowebService().createSoapClient(
                    url
                  )

                  soapClient.ABM_CREATION_FICHIER_ABM(args, function(
                    err,
                    result
                  ) {
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

                    if (err) {
                      console.log('aboweb failed', err)
                    }
                  })
                }
              })
              .catch(function(err) {
                console.log('get token aboweb id failed', err)
              })
          } else {
            console.log('client fetch failed')
          }
        })
        .catch(function(err) {
          console.log('get client aboweb id failed', err)
        })
    } catch (err) {
      console.log(err)
    }
  },
  sqs: new AWS.SQS()
})

export default subscriptionDDCBCreateConsumer
