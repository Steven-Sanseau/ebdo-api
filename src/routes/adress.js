import { createController } from 'awilix-koa'

const api = adresseService => ({
  findAdresse: async ctx => ctx.ok(await adresseService.find(ctx.query)),
  getAdresse: async ctx => ctx.ok(await adresseService.get(ctx.params.id)),
  createAdresse: async ctx =>
    ctx.created(await adresseService.create(ctx.request.body)),
  updateAdresse: async ctx =>
    ctx.ok(await adresseService.update(ctx.params.id, ctx.request.body)),
  removeAdresse: async ctx =>
    ctx.noContent(await adresseService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/adresse')
  .get('', 'findAdresse')
  .get('/:id', 'getAdresse')
  .post('', 'createAdresse')
  .patch('/:id', 'updateAdresse')
  .delete('/:id', 'removeAdresse')
