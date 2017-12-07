import { makeClassInvoker } from 'awilix-koa'
import Paginator from 'paginator'
import _ from 'lodash'

class PaymentAPI {
  constructor({ paymentService }) {
    this.PaymentAPI = PaymentAPI
  }

  async create(ctx) {
    console.log(ctx.request.body)
    const body = await this.PaymentAPI.create(ctx.request.body.client)
    ctx.status = 201
    ctx.ok(body)
  }

  async update(ctx) {
    const body = await this.PaymentAPI.update(
      ctx.params.id,
      ctx.request.body.client
    )
    ctx.ok(body)
  }
}

export default function(router) {
  const api = makeClassInvoker(PaymentAPI)

  router
    .get('/payment', api('getAll'))
    .post('/payment/charge/:token', api('getById'))
}
