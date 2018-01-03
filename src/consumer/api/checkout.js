import rp from 'request-promise-native'
import { env } from '../../lib/env'

export const patchCheckout = (checkout, codeCheckout) => {
  const options = {
    method: 'PATCH',
    uri: env.API_URL + `checkout/aboweb/${checkout.checkout_id}`,
    body: { checkout: { aboweb_subscribe_id: codeCheckout } },
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return rp(options)
}

export default patchCheckout
