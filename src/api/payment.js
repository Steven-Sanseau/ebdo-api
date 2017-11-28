import { makeClassInvoker } from 'awilix-koa'
import Paginator from 'paginator'
import _ from 'lodash'

class ClientAPI {
  constructor({ clientService }) {
    this.clientService = clientService
  }

  async getById(ctx) {
    const body = await this.clientService.findById(ctx.params.id)
    ctx.ok(body)
  }

  async getAll(ctx) {
    const page = ctx.request.query.page || 1
    const total = await this.clientService.countAll()

    const paginator = new Paginator(50, 1)
    const pagination = paginator.build(total, page)

    const body = await this.clientService.findAll(pagination.last_result)

    ctx.ok({ data: body, pagination })
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
    .get('/payment', api('getAll'))
    .post('/payment/charge/:token', api('getById'))
    .post('/clients', api('create'))
    .put('/clients/:id', api('update'))
}
