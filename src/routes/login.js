import { createController } from 'awilix-koa'

const api = loginService => ({
  getCodeLogin: async ctx =>
    ctx.ok(await loginService.sendCodeLogin(ctx.params.email))
})

export default createController(api)
  .prefix('/v1/login')
  .get('/code/:email', 'getCodeLogin')
