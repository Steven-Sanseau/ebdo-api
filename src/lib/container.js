import { createContainer, Lifetime, ResolutionMode } from 'awilix'
import { logger } from './logger'
import db from '../config/sequelize'

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const modulesToLoad = [
  // Services should be scoped to the request.
  // This means that each request gets a separate instance
  // of a service.
  ['services/*.js', Lifetime.SCOPED],
  ['stores/*.js', Lifetime.SINGLETON]
]

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export function configureContainer() {
  const opts = {
    // Classic means Awilix will look at function parameter
    // names rather than passing a Proxy.
    resolutionMode: ResolutionMode.CLASSIC
  }

  const AdressModel = db.Adress
  const CheckoutModel = db.Checkout
  const ClientModel = db.Client
  const NewsletterModel = db.Newsletter
  const OfferModel = db.Offer
  const SponsorModel = db.Sponsor
  const TokenModel = db.Token

  return createContainer(opts)
    .loadModules(modulesToLoad, {
      // `modulesToLoad` paths should be relative
      // to this file's parent directory.
      cwd: `${__dirname}/..`,
      // Example: registers `services/todo-service.js` as `todoService`
      formatName: 'camelCase'
    })
    .registerValue({
      // Our logger is already constructed,
      // so provide it as-is to anyone who wants it.
      logger,
      AdressModel,
      CheckoutModel,
      ClientModel,
      NewsletterModel,
      OfferModel,
      SponsorModel,
      TokenModel
    })
}
