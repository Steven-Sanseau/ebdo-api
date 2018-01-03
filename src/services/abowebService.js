import soap from 'soap'
import crypto from 'crypto'

import {env} from "../lib/env";

const ABOWEB_RESULTS_LIMIT = 50;

export default class AbowebService {
  constructor(ClientModel, AddressModel, CronModel) {
    this.ClientModel = ClientModel
    this.AddressModel = AddressModel
    this.CronModel = CronModel
  }

  async createSoapClient(url) {
    return soap.createClientAsync(url).then((soapClient) => {
      const sha1 = crypto.createHash('sha1')
      const wsSecurity = new soap.WSSecurity(
        env.ABO_WEB_LOGIN,
        sha1.update(env.ABO_WEB_KEY).digest('base64')
      )
      soapClient.setSecurity(wsSecurity)

      return soapClient;
    })
  }

  /**
   * Method to fetch all modified clients from Aboweb and sync them with our database
   */
  async syncClients() {
    return new Promise(async (resolve, reject) => {
      const lastCronjob = await this.CronModel.findOne({
        where: { type: "syncClientsAboweb" },
        order: [
          ['created_at', 'DESC']
        ]
      })
      const lastModified = lastCronjob ? lastCronjob.created_at.toISOString() : null;
      const soapClient = await this.createSoapClient(`${env.ABO_WEB_URL}ClientService?wsdl`)
      let clients = ABOWEB_RESULTS_LIMIT;
      let clientsUpdated = 0;
      let offset = 0;

      while (clients >= ABOWEB_RESULTS_LIMIT) {
        const response = await soapClient.getClientsModifiedBetweenAsync({ date1: lastModified, offset });
        if (response) {
          response.client.forEach(async (client) => {
            // Update client
            await this.ClientModel
              .upsert({
                email: client.email,
                first_name: client.prenom,
                last_name: client.nom,
                type_client: client.typeClient,
                aboweb_client_id: client.codeClient
              }, { aboweb_client_id: client.codeClient })
              .then(() => clientsUpdated++)
              .catch(err => console.log(err, client))

            // Update invoice address
            const clientDb = await this.ClientModel.findOne({where: { aboweb_client_id: client.codeClient }})
            if (client.adresse2 && clientDb) {
              this.AddressModel
                .upsert({
                  first_name: client.prenom,
                  last_name: client.nom,
                  address: client.adresse2,
                  city: client.ville,
                  postal_code: client.cp,
                  country: client.codeIsoPays,
                  client_id: clientDb.client_id,
                  type_address: 'invoice'
                }, { client_id: clientDb.client_id, type_address: 'invoice' })
                .catch(err => console.log(err, client))
            }
          })

          offset += response.client.length;
          console.log(offset);
        } else {
          clients = 0;
        }
      }

      await this.CronModel.build({
        type: "syncClientsAboweb",
        data: {
          clientsUpdated: clientsUpdated
        }
      }).save()
      resolve();
    })
  }
}
