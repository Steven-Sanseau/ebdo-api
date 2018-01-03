import { createController } from 'awilix-koa'

const api = tokenService => ({
  createToken: async ctx =>
    ctx.created(await tokenService.create(ctx.request.body)),
  updateAbowebConsumerToken: async ctx =>
    ctx.ok(await tokenService.updateAboweb(ctx.params.id, ctx.request.body)),
  slimpay: async ctx => ctx.ok(await tokenService.slimpay())
})

export default createController(api)
  .prefix('/v1/token')
  .get('/slimpay', 'slimpay')
  .post('', 'createToken')
  .patch('/aboweb/:id', 'updateAbowebConsumerToken')
