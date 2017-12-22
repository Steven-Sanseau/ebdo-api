import { createController } from 'awilix-koa'

const api = clientService => ({
  countClient: async ctx => ctx.ok(await clientService.countClient()),
  getClient: async ctx =>
    ctx.ok(await clientService.findByEmail(ctx.params.email)),
  createClient: async ctx =>
    ctx.created(await clientService.create(ctx.request.body)),
  updateClient: async ctx =>
    ctx.ok(await clientService.update(ctx.params.id, ctx.request.body))
})

export default createController(api)
  .prefix('/v1/client')
  // .get('', 'findClient')
  .get('/count', 'countCliente')
  .get('/:email', 'getClient')
  .post('', 'createClient')
  .patch('/:id', 'updateClient')
// .delete('/:id', 'removeClient')
