import { configureContainer } from "../lib/container";
const container = configureContainer();

container.resolve('abowebService')
  .syncSubscriptions()
  .then(() => process.exit())
  .catch((e) => {
    console.log(e) // TODO Sentry ?
    process.exit()
  })
