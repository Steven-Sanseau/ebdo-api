import Producer from 'sqs-producer'
import { logger } from '../lib/logger'
import uniqid from 'uniqid'

const producer = Producer.create({
  queueUrl: 'https://sqs.eu-west-2.amazonaws.com/606145181943/new-subscription',
  region: process.env.AWS_AREA,
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY
})

export default async function newSubscriptionProducer(message) {
  const params = {
    body: JSON.stringify(message),
    id: uniqid('producer-newSubscription-')
  }

  return producer.send(params, err => {
    logger.error(err)
  })
}
