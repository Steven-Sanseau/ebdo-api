import Producer from 'sqs-producer'

const producer = Producer.create({
  region: process.env.AWS_AREA,
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY
})

export default producer
