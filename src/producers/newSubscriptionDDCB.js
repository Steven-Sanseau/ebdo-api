import Producer from 'sqs-producer'
import { logger } from '../lib/logger'
import { env } from '../lib/env'
import uniqid from 'uniqid'

const producer = Producer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}/${
    env.AWS_URL_NEW_SUBSCRIPTION_DD_CB
  }`,
  region: env.AWS_AREA,
  accessKeyId: env.AWS_KEY_ID,
  secretAccessKey: env.AWS_ACCESS_KEY
})

export default async function newSubscriptionDDCB(message) {
  const params = {
    body: JSON.stringify(message),
    id: uniqid('producer-newSubscription-dd-cb-')
  }

  return producer.send(params, err => {
    logger.error(err)
  })
}
