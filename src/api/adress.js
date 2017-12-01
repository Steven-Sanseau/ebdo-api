import { makeClassInvoker } from 'awilix-koa'
import { Sequelize } from '../config/sequelize'
import Paginator from 'paginator'
import _ from 'lodash'

class AdressAPI {
  constructor({ adressService }) {
    this.adressService = adressService
  }

  async create(ctx) {
    const body = await this.adressService
      .create(ctx.request.body.adress)
      .catch(err => {
        ctx.status = 400
        ctx.ok(err)
      })
    ctx.status = 201
    ctx.ok(body)
  }

  async update(ctx) {
    const body = await this.adressService.update(
      ctx.params.id,
      ctx.request.body.adress
    )
    ctx.ok(body)
  }
}

export default function(router) {
  const api = makeClassInvoker(AdressAPI)

  router.post('/adress', api('create')).put('/adress/:id', api('update'))
}
