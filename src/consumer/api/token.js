import rp from 'request-promise-native'
import { env } from '../../lib/env'

export const patchToken = (token, codeCard) => {
  const options = {
    method: 'PATCH',
    uri: env.API_URL + `token/aboweb/${token.token_id}`,
    body: { token: { aboweb_id: codeCard } },
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return rp(options)
}

export const getAbowebIdToken = tokenId => {
  const options = {
    method: 'GET',
    uri: env.API_URL + `token/aboweb/${tokenId}`,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return rp(options)
}

export default { patchToken, getAbowebIdToken }
