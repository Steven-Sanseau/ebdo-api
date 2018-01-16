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
      console.log('consumerDebug', bodyMessage)
      // const message = JSON.parse(bodyMessage)
      // const producer = Producer.create({
      //   queueUrl: `https://sqs.${env.AWS_AREA}.${env.AWS_URL_BASE}${
      //     message.queueName
      //   }`,
      //   region: env.AWS_AREA,
      //   accessKeyId: env.AWS_KEY_ID,
      //   secretAccessKey: env.AWS_ACCESS_KEY
      // })
      //
      // const params = {
      //   body: JSON.stringify(message),
      //   id: uniqid('producer-debug-')
      // }
      //
      // producer.send(params, err => {
      //   done()
      // })
    } catch (err) {
      console.log(err)
    }
  },
  sqs: new AWS.SQS()
})

export default debugConsumer
