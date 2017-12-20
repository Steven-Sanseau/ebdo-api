import { createController } from 'awilix-koa'

const api = addressService => ({
  findAddress: async ctx => ctx.ok(await addressService.find(ctx.query)),
  getAddress: async ctx => ctx.ok(await addressService.get(ctx.params.id)),
  createAddress: async ctx =>
    ctx.created(await addressService.create(ctx.request.body)),
  updateAddress: async ctx =>
    ctx.ok(await addressService.update(ctx.params.id, ctx.request.body)),
  removeAddress: async ctx =>
    ctx.noContent(await addressService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/login')
  .get('code', 'getCodeLogin')
  .get('code/:token', 'getTokenLogin')
  .post('', 'createTokenAccess')
  .patch('/:id', 'updateAddress')
  .delete('/:id', 'removeAddress')
