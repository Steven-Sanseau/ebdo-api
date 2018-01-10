import Consumer from 'sqs-consumer'
import AWS from 'aws-sdk'
import { env } from '../../../lib/env'

AWS.config.update({
  accessKeyId: env.AWS_KEY_ID || '',
  secretAccessKey: env.AWS_ACCESS_KEY || '',
  region: env.AWS_AREA || ''
})

const debugConsumer = Consumer.create({
  queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
    env.AWS_URL_DEBUG_QUEUE
  }`,
  handleMessage: async (bodyMessage, done) => {
    try {
      const message = JSON.parse(bodyMessage)
      console.log('message received debug', message)
    } catch (err) {
      console.log(err)
    }
  },
  sqs: new AWS.SQS()
})

export default debugConsumer
