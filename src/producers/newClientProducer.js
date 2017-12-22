import Producer from 'sqs-producer'
import { logger } from '../lib/logger'
import { env } from '../lib/env'
import uniqid from 'uniqid'

const producer = Producer.create({
  queueUrl: 'https://sqs.eu-west-2.amazonaws.com/606145181943/new-client',
  region: env.AWS_AREA,
  accessKeyId: env.AWS_KEY_ID,
  secretAccessKey: env.AWS_ACCESS_KEY
})

export default async function newClientProducer(message) {
  const params = {
    body: JSON.stringify(message),
    id: uniqid('producer-newClient-')
  }

  return producer.send(params, err => {
    logger.error(err)
  })
}
