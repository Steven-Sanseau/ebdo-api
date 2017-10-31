import { makeClassInvoker } from 'awilix-koa'

class ClientAPI {
  constructor({ clientService }) {
    this.clientService = clientService
  }

  async findClasses(ctx) {
    const classes = await this.clientService.find()
    ctx.ok(classes)
  }

  async getId(ctx) {
    const body = await this.clientService.getById(ctx.params.id)
    ctx.ok(body)
  }

  async list(ctx) {
    const body = await this.clientService.findAll()
    ctx.ok(body)
  }

  async createItem(ctx) {
    const body = await this.clientService.setNewId(ctx.request.body.name)
    ctx.status = 201
    ctx.ok(body)
  }

  async updateItem(ctx) {
    const body = await this.clientService.updateId(
      ctx.params.id,
      ctx.request.body.name
    )
    ctx.ok(body)
  }

  async removeItem(ctx) {
    await this.clientService.removeId(ctx.params.id)
    ctx.status = 204
  }
}

export default function(router) {
  const api = makeClassInvoker(ClientAPI)

  router.get('/clients', api('list'))
}
