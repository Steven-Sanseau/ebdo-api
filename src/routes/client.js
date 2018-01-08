import { createController } from 'awilix-koa'

const api = clientService => ({
  countClient: async ctx => ctx.ok(await clientService.countClient()),
  getClient: async ctx =>
    ctx.ok(await clientService.findByEmail(ctx.params.email)),
  getClientById: async ctx =>
    ctx.ok(await clientService.findById(ctx.params.id)),
  createClient: async ctx =>
    ctx.created(await clientService.create(ctx.request.body)),
  updateAbowebConsumerClient: async ctx =>
    ctx.ok(await clientService.updateAboweb(ctx.params.id, ctx.request.body))
})

export default createController(api)
  .prefix('/v1/client')
  .get('/count', 'countClient')
  .get('/:email', 'getClient')
  .post('', 'createClient')
  .patch('/aboweb/:id', 'updateAbowebConsumerClient')
  .get('/aboweb/:id', 'getClientById')
