import { configureContainer } from '../lib/container'
const container = configureContainer()

container
  .resolve('checkoutService')
  .exportGodfatherGift()
  .then(() => process.exit())
  .catch(e => {
    console.log(e)
    process.exit()
  })
