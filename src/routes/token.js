import { createController } from 'awilix-koa'

const api = tokenService => ({
  findToken: async ctx => ctx.ok(await tokenService.find(ctx.query)),
  getToken: async ctx => ctx.ok(await tokenService.get(ctx.params.id)),
  createToken: async ctx =>
    ctx.created(await tokenService.create(ctx.request.body)),
  updateToken: async ctx =>
    ctx.ok(await tokenService.update(ctx.params.id, ctx.request.body)),
  removeToken: async ctx =>
    ctx.noContent(await tokenService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/token')
  .get('', 'findToken')
  .get('/:id', 'getToken')
  .post('', 'createToken')
  .patch('/:id', 'updateToken')
  .delete('/:id', 'removeToken')
