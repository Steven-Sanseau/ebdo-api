import soap from 'soap'
import crypto from 'crypto'
import env from '../lib/env'

// The function being called when registering services.
export default function() {
  async function getClient() {
    return new Promise((resolve, reject) => {
      var url = 'http://dev.aboweb.com/aboweb/ClientService?wsdl'
      var args = { name: 'value' }
      var data = {}

      soap.createClient(url, function(err, client) {
        var sha1 = crypto.createHash('sha1')

        var wsSecurity = new soap.WSSecurity(
          env.ABO_WEB_LOGIN,
          sha1.update(env.ABO_WEB_KEY).digest('base64')
        )
        client.setSecurity(wsSecurity)

        client.getClients(args, function(err, result) {
          resolve(result)
        })
      })
    })
  }

  return {
    getClient
  }
}
