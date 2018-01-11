import Raven from 'raven'

Raven.config(
  'https://f4f9535b2d20462e934cb25568de0682:ab9e059ba9cd44e49da5d97dc0fbcffd@sentry.io/265064'
).install()

import clientCreateConsumer from '../consumer/consumers/client/newClient'
import newCardConsumer from '../consumer/consumers/card/newCard'
import newAddressConsumer from '../consumer/consumers/address/newAddress'
import subscriptionDDCBCreateConsumer from '../consumer/consumers/subscription/newSubscriptionDDCB'
import subscriptionADLCBCreateConsumer from '../consumer/consumers/subscription/newSubscriptionADLCB'
import subscriptionADLSEPACreateConsumer from '../consumer/consumers/subscription/newSubscriptionADLSEPA'
import debugConsumer from '../consumer/consumers/debug/debugConsumer'

try {
  //clientCreateConsumer
  console.log('Create Queue from clientCreateConsumer')
  clientCreateConsumer.on('error', err => {
    Raven.captureException(err)
  })
  clientCreateConsumer.start()

  //newCardConsumer
  console.log('Create Queue from newCardConsumer')
  newCardConsumer.on('error', err => {
    Raven.captureException(err)
  })
  newCardConsumer.start()

  //newAddressConsumer
  console.log('Create Queue from newAddressConsumer')
  newAddressConsumer.on('error', err => {
    Raven.captureException(err)
  })
  newAddressConsumer.start()

  //subscriptionDDCBCreateConsumer
  console.log('Create Queue from subscriptionDDCBCreateConsumer')
  subscriptionDDCBCreateConsumer.on('error', err => {
    Raven.captureException(err)
  })
  subscriptionDDCBCreateConsumer.start()

  //subscriptionADLCBCreateConsumer
  console.log('Create Queue from subscriptionADLCBCreateConsumer')
  subscriptionADLCBCreateConsumer.on('error', err => {
    Raven.captureException(err)
  })
  subscriptionADLCBCreateConsumer.start()

  // subscriptionADLSEPACreateConsumer
  console.log('Create Queue from subscriptionADLSEPACreateConsumer')
  subscriptionADLSEPACreateConsumer.on('error', err => {
    Raven.captureException(err)
  })
  subscriptionADLSEPACreateConsumer.start()

  // debug
  console.log('Create Queue from debug')
  debugConsumer.on('error', err => {
    Raven.captureException(err)
  })
  debugConsumer.start()
} catch (e) {
  Raven.captureException(e)
}
