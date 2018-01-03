import { createController } from 'awilix-koa'

const api = tokenService => ({
  createToken: async ctx =>
    ctx.created(await tokenService.create(ctx.request.body)),
  updateToken: async ctx =>
    ctx.ok(await tokenService.update(ctx.params.id, ctx.request.body))
})

export default createController(api)
  .prefix('/v1/token')
  .post('', 'createToken')
  .patch('/:id', 'updateToken')
