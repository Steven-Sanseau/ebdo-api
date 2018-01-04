import { createController } from 'awilix-koa'
import jwtMiddleware from "koa-jwt";
import { env } from "../lib/env";

const api = subscriptionService => ({
  getSubscriptions: async ctx => ctx.ok(await subscriptionService.findSubscriptionsForClient(ctx.params.abowebClientId)),
})

export default createController(api)
  .prefix('/v1/subscription')
  .get('/client/:abowebClientId', 'getSubscriptions', { before: [jwtMiddleware({ secret: env.JWT_PRIVATE_KEY })] })
