import Koa from 'koa'
import Router from 'koa-router'
import { scopePerRequest, loadControllers } from 'awilix-koa'
import cors from 'kcors'
import respond from 'koa-respond'
import compress from 'koa-compress'
import createApis from './createApis'
import bodyParser from 'koa-bodyparser'

import logger from './logger'
import getConfiguredContainer from './configureContainer'
import notFoundHandler from '../middleware/notFound'
import { errorHandler } from '../middleware/errorHandler'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<Koa>} The configured app.
 */
export default async function createServer() {
  logger.debug('Creating server...', { scope: 'startup' })
  const app = new Koa()
  const router = new Router({
    prefix: '/v1'
  })

  app
    .use(errorHandler)
    .use(compress())
    .use(respond())
    .use(cors())
    .use(bodyParser())

  // Container is configured with our services and whatnot.
  const container = getConfiguredContainer()

  // Creates an Awilix scope per request. Check out the awilix-koa
  // docs for details: https://github.com/jeffijoe/awilix-koa
  app.use(scopePerRequest(container))
  app.use(loadControllers('../api/*.js', { cwd: __dirname }))

  // Create the API's.
  // createApis(router)
  //
  // // Install routes
  // app.use(router.allowedMethods())
  // app.use(router.routes())

  // Default handler when nothing stopped the chain.
  app.use(notFoundHandler)

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return app
}
