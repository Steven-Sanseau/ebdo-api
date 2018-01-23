import { createController } from 'awilix-koa'
import jwtMiddleware from 'koa-jwt'

import { env } from '../lib/env'

const api = consumerService => ({
  produceClientById: async ctx =>
    ctx.ok(await consumerService.createProducerClientById(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/consumer')
  .get('/client/:id', 'produceClientById')
