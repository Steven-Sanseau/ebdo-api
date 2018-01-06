import rp from 'request-promise-native'
import { env } from '../../lib/env'

export const patchAddress = (address, codeAddress) => {
  const options = {
    method: 'PATCH',
    uri: env.API_URL + `address/aboweb/${address.address_id}`,
    body: { address: { aboweb_address_id: codeAddress } },
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return rp(options)
}

export default patchAddress
