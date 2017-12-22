import Producer from 'sqs-producer'
import { env } from './events'

const producer = Producer.create({
  region: env.AWS_AREA,
  accessKeyId: env.AWS_KEY_ID,
  secretAccessKey: env.AWS_ACCESS_KEY
})

export default producer
