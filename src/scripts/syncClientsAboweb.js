import { configureContainer } from "../lib/container";
const container = configureContainer();

container.resolve('abowebService')
  .syncClients()
  .then(() => process.exit())
  .catch((e) => {
    console.log(e) // TODO Sentry ?
    process.exit()
  })
