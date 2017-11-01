import { makeClassInvoker } from 'awilix-koa'

class ClientAPI {
  constructor({ clientService }) {
    this.clientService = clientService
  }

  async getById(ctx) {
    const body = await this.clientService.findById(ctx.params.id)
    ctx.ok(body)
  }

  async getAll(ctx) {
    const body = await this.clientService.findAll()
    ctx.ok(body)
  }

  async create(ctx) {
    console.log(ctx.request.body)
    const body = await this.clientService.create(ctx.request.body.client)
    ctx.status = 201
    ctx.ok(body)
  }

  async update(ctx) {
    const body = await this.clientService.update(
      ctx.params.id,
      ctx.request.body.client
    )
    ctx.ok(body)
  }

  async remove(ctx) {
    await this.clientService.delete(ctx.params.id)
    ctx.status = 204
  }
}

export default function(router) {
  const api = makeClassInvoker(ClientAPI)

  router
    .get('/clients', api('getAll'))
    .get('/clients/:id', api('getById'))
    .post('/clients', api('create'))
    .post('/clients/:id', api('update'))
    .delete('/clients/:id', api('remove'))
}
