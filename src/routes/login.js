import { createController } from 'awilix-koa'

const api = loginService => ({
  getCodeLogin: async ctx =>
    ctx.ok(await loginService.sendCodeLogin(ctx.params.email)),
  getJwt: async ctx =>
    ctx.ok(await loginService.getJwt(ctx.params.email, ctx.params.code))
})

export default createController(api)
  .prefix('/v1/login')
  .get('/code/:email', 'getCodeLogin')
  .get('/:code/:email', 'getJwt')
