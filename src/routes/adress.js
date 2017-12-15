import { createController } from 'awilix-koa'

const api = adressService => ({
  findAdresse: async ctx => ctx.ok(await adressService.find(ctx.query)),
  getAdresse: async ctx => ctx.ok(await adressService.findById(ctx.params.id)),
  createAdresse: async ctx =>
    ctx.created(await adressService.create(ctx.request.body)),
  updateAdresse: async ctx =>
    ctx.ok(await adressService.update(ctx.params.id, ctx.request.body)),
  removeAdresse: async ctx =>
    ctx.noContent(await adressService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/adress')
  // .get('', 'findAdresse')
  .get('/:id', 'getAdresse')
  .post('', 'createAdresse')
  .patch('/:id', 'updateAdresse')
// .delete('/:id', 'removeAdresse')
