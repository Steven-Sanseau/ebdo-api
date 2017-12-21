import { createController } from 'awilix-koa'
import jwtMiddleware from "koa-jwt"

import { env } from '../lib/env'

const api = loginService => ({
  getCodeLogin: async ctx =>
    ctx.ok(await loginService.sendCodeLogin(ctx.params.email)),
  getJwt: async ctx =>
    ctx.ok(await loginService.getJwt(ctx.params.email, ctx.params.code)),
  protectedRoute: async ctx =>
    ctx.ok()
})

export default createController(api)
  .prefix('/v1/login')
  .get('/code/:email', 'getCodeLogin')
  .get('/:code/:email', 'getJwt')
  .get('/protectedRoute', 'protectedRoute', {
    before: [jwtMiddleware({ secret: env.JWT_PRIVATE_KEY })]
  })
