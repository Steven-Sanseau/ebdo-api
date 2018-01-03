import { createController } from 'awilix-koa'

const api = tokenService => ({
  createToken: async ctx =>
    ctx.created(await tokenService.create(ctx.request.body)),
  updateAbowebConsumerToken: async ctx =>
    ctx.ok(await tokenService.updateAboweb(ctx.params.id, ctx.request.body))
})

export default createController(api)
  .prefix('/v1/token')
  .post('', 'createToken')
  .patch('/aboweb/:id', 'updateAbowebConsumerToken')
