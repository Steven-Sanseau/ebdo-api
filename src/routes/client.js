import { createController } from 'awilix-koa'

const api = clientService => ({
  // findClient: async ctx => ctx.ok(await clientService.find(ctx.query)),
  getClient: async ctx =>
    ctx.ok(await clientService.findByEmail(ctx.params.email)),
  createClient: async ctx =>
    ctx.created(await clientService.create(ctx.request.body)),
  updateClient: async ctx =>
    ctx.ok(await clientService.update(ctx.params.email, ctx.request.body))
  // removeClient: async ctx =>
  //   ctx.noContent(await clientService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/client')
  // .get('', 'findClient')
  .get('/:email', 'getClient')
  .post('', 'createClient')
  .patch('/:email', 'updateClient')
// .delete('/:id', 'removeClient')
