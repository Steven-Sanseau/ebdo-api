import rp from 'request-promise-native'
import { env } from '../../lib/env'

export const patchClient = (client, codeClient) => {
  const options = {
    method: 'PATCH',
    uri: env.API_URL + `client/aboweb/${client.client_id}`,
    body: { client: { aboweb_client_id: codeClient } },
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return rp(options)
}

export const getAbowebIdClient = clientId => {
  const options = {
    method: 'GET',
    uri: env.API_URL + `client/aboweb/${clientId}`,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return rp(options)
}

export default { patchClient, getAbowebIdClient }
