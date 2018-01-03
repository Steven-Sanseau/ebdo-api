import Raven from 'raven'

Raven.config(
  'https://f4f9535b2d20462e934cb25568de0682:ab9e059ba9cd44e49da5d97dc0fbcffd@sentry.io/265064'
).install()

import clientCreateConsumer from '../consumer/consumers/client/newClient'
import newCardConsumer from '../consumer/consumers/card/newCard'
import subscriptionDDCBCreateConsumer from '../consumer/consumers/subscription/newSubscriptionDDCB'
import subscriptionADLCBCreateConsumer from '../consumer/consumers/subscription/newSubscriptionADLCB'
import subscriptionADLSEPACreateConsumer from '../consumer/consumers/subscription/newSubscriptionADLSEPA'

try {
  //clientCreateConsumer
  clientCreateConsumer.on('error', err => {
    console.log(err.message)
  })
  clientCreateConsumer.start()

  //newCardConsumer
  newCardConsumer.on('error', err => {
    console.log(err.message)
  })
  newCardConsumer.start()

  //subscriptionDDCBCreateConsumer
  subscriptionDDCBCreateConsumer.on('error', err => {
    console.log(err.message)
  })
  subscriptionDDCBCreateConsumer.start()

  //subscriptionADLCBCreateConsumer
  subscriptionADLCBCreateConsumer.on('error', err => {
    console.log(err.message)
  })
  subscriptionADLCBCreateConsumer.start()

  // subscriptionADLSEPACreateConsumer
  subscriptionADLSEPACreateConsumer.on('error', err => {
    console.log(err.message)
  })
  subscriptionADLSEPACreateConsumer.start()
} catch (e) {
  Raven.captureException(e)
}
