import { createController } from 'awilix-koa'

const api = clientService => ({
  // findClient: async ctx => ctx.ok(await clientService.find(ctx.query)),
  // getClient: async ctx => ctx.ok(await clientService.get(ctx.params.id)),
  createClient: async ctx =>
    ctx.created(await clientService.create(ctx.request.body)),
  updateClient: async ctx =>
    ctx.ok(await clientService.update(ctx.params.id, ctx.request.body))
  // removeClient: async ctx =>
  //   ctx.noContent(await clientService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/client')
  // .get('', 'findClient')
  .get('/:id', 'getClient')
  .post('', 'createClient')
  .patch('/:id', 'updateClient')
// .delete('/:id', 'removeClient')
