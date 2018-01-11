import soap from 'soap'
import crypto from 'crypto'

import { env } from '../lib/env'

const ABOWEB_RESULTS_LIMIT = 50
const CRON_TYPE_SUBSCRIPTIONS = 'syncSubscriptionsAboweb'
const CRON_TYPE_CLIENTS = 'syncClientsAboweb'

export default class AbowebService {
  constructor(ClientModel, AddressModel, SubscriptionModel, CronModel) {
    this.ClientModel = ClientModel
    this.AddressModel = AddressModel
    this.SubscriptionModel = SubscriptionModel
    this.CronModel = CronModel
  }

  async createSoapClient(url) {
    return soap.createClientAsync(url).then(soapClient => {
      const sha1 = crypto.createHash('sha1')
      const wsSecurity = new soap.WSSecurity(
        env.ABO_WEB_LOGIN,
        sha1.update(env.ABO_WEB_KEY).digest('base64')
      )
      soapClient.setSecurity(wsSecurity)

      return soapClient
    })
  }

  /**
   * Method to fetch all modified subscriptions from Aboweb and sync them with our database
   */
  async syncSubscriptions() {
    let offset = 0

    return new Promise(async (resolve, reject) => {
      try {
        const lastCronjob = await this.CronModel.findOne({
          where: { type: CRON_TYPE_SUBSCRIPTIONS },
          order: [['last_record_updated_at', 'DESC']]
        })
        const lastModified = lastCronjob
          ? lastCronjob.last_record_updated_at.toISOString()
          : new Date(0).toISOString()
        const soapClient = await this.createSoapClient(
          `${env.ABO_WEB_URL}AbonnementService?wsdl`
        )
        let subscriptions = ABOWEB_RESULTS_LIMIT

        while (subscriptions >= ABOWEB_RESULTS_LIMIT) {
          const response = await soapClient.getAbonnementsModifiedBetweenAsync({
            date1: lastModified,
            date2: new Date().toISOString(),
            offset
          })

          if (response) {
            response.abonnement.forEach(async abonnement => {
              await this.SubscriptionModel.upsert({
                aboweb_subscription_id: abonnement.refAbonnement,
                aboweb_client_id: abonnement.codeClient,
                aboweb_offer_id: abonnement.codeTarifFormule,
                first_number_delivered: abonnement.pns,
                last_number_delivered: abonnement.dns,
                is_invoiced: abonnement.facture,
                is_suspended: abonnement.suspendu,
                is_resubscription: abonnement.reabonnement,
                order_number: abonnement.noCommande,
                free_subscription: abonnement.aboGratuit,
                number_of_copy: abonnement.nbExemplaires,
                begin_at: abonnement.dateDebut,
                end_at: abonnement.dateFin,
                invoiced_number: abonnement.noFacture,
                status: abonnement.etat,
                created_at: abonnement.creation,
                updated_at: abonnement.modification
              }).catch(err => console.log(err, abonnement))
            })

            offset += response.abonnement.length
            console.log(offset)
            subscriptions = response.abonnement.length
          } else {
            subscriptions = 0
          }
        }

        await this.saveCronjobModel(CRON_TYPE_SUBSCRIPTIONS, this.SubscriptionModel, offset);
        resolve()
      } catch (e) {
        await this.saveCronjobModel(CRON_TYPE_SUBSCRIPTIONS, this.SubscriptionModel, offset, e);
        reject(e)
      }
    })
  }

  /**
   * Method to fetch all modified clients from Aboweb and sync them with our database
   */
  async syncClients() {
    let offset = 0

    return new Promise(async (resolve, reject) => {
      try {
        const lastCronjob = await this.CronModel.findOne({
          where: { type: CRON_TYPE_CLIENTS },
          order: [['last_record_updated_at', 'DESC']]
        })
        const lastModified = lastCronjob
          ? lastCronjob.last_record_updated_at.toISOString()
          : null
        const soapClient = await this.createSoapClient(
          `${env.ABO_WEB_URL}ClientService?wsdl`
        )
        let clients = ABOWEB_RESULTS_LIMIT

        while (clients >= ABOWEB_RESULTS_LIMIT) {
          const response = await soapClient.getClientsModifiedBetweenAsync({
            date1: lastModified,
            offset
          })

          if (response) {
            response.client.forEach(async client => {
              // Update client
              await this.ClientModel.upsert({
                email: client.email,
                first_name: client.prenom,
                last_name: client.nom,
                type_client: client.typeClient,
                aboweb_client_id: client.codeClient
              }).catch(err => console.log(err, client))

              // Update invoice address
              const clientDb = await this.ClientModel.findOne({
                where: { aboweb_client_id: client.codeClient }
              })
              if (client.adresse2 && clientDb) {
                this.AddressModel.upsert({
                  first_name: client.prenom,
                  last_name: client.nom,
                  address: client.adresse2,
                  city: client.ville,
                  postal_code: client.cp,
                  country: client.codeIsoPays,
                  client_id: clientDb.client_id,
                  type_address: 'invoice',
                  aboweb_address_id: clientDb.client_aboweb_id,
                  address_equal: true
                }).catch(err => console.log(err, client))
              }
            })

            offset += response.client.length
            console.log(offset)
            clients = response.client.length
          } else {
            clients = 0
          }
        }

        await this.saveCronjobModel(CRON_TYPE_CLIENTS, this.ClientModel, offset);
        resolve()
      } catch (e) {
        await this.saveCronjobModel(CRON_TYPE_CLIENTS, this.ClientModel, offset, e);
        reject(e)
      }
    })
  }

  async saveCronjobModel(type, model, offset, error = false) {
    const lastRecordUpdated = await model.findOne({ order: [['updated_at', 'DESC']] });
    await this.CronModel.build({
      type,
      data: {
        recordsUpdated: offset,
        error
      },
      last_record_updated_at: lastRecordUpdated ? lastRecordUpdated.updated_at : new Date()
    }).save()
  }
}
