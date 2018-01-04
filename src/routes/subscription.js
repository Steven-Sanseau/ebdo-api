import { createController } from 'awilix-koa'
import jwtMiddleware from "koa-jwt";
import { env } from "../lib/env";

const api = subscriptionService => ({
  getSubscriptions: async ctx => {
    return ctx.ok(await subscriptionService.findSubscriptionsForClient(ctx.state.user.aboweb_client_id))
  }
})

export default createController(api)
  .prefix('/v1/subscription')
  .get('/', 'getSubscriptions', { before: [jwtMiddleware({ secret: env.JWT_PRIVATE_KEY })] })
