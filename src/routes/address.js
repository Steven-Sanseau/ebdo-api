import { createController } from 'awilix-koa'

const api = addressService => ({
  getAddress: async ctx => ctx.ok(await addressService.findById(ctx.params.id)),
  createAddress: async ctx =>
    ctx.created(await addressService.create(ctx.request.body)),
  updateAddress: async ctx =>
    ctx.ok(await addressService.update(ctx.params.id, ctx.request.body)),
  updateAddressAboweb: async ctx =>
    ctx.ok(await addressService.updateAboweb(ctx.params.id, ctx.request.body))
})

export default createController(api)
  .prefix('/v1/address')
  .get('/:id', 'getAddress')
  .post('', 'createAddress')
  .patch('/:id', 'updateAddress')
  .patch('/aboweb/:id', 'updateAddressAboweb')
