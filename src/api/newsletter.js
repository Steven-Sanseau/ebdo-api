import { makeClassInvoker } from 'awilix-koa'
import { Sequelize } from '../config/sequelize'
import Paginator from 'paginator'
import _ from 'lodash'

class NewsletterAPI {
  constructor({ newsletterService }) {
    this.newsletterService = newsletterService
  }

  async create(ctx) {
    const body = await this.newsletterService
      .create(ctx.request.body.newsletter)
      .catch(err => {
        ctx.status = 400
        ctx.ok(err)
      })
    ctx.status = 201
    ctx.ok(body)
  }

  async update(ctx) {
    const body = await this.newsletterService.update(
      ctx.params.email,
      ctx.request.body.newsletter
    )
    ctx.ok(body)
  }
}

export default function(router) {
  const api = makeClassInvoker(NewsletterAPI)

  router
    .post('/newsletter', api('create'))
    .put('/newsletter/:email', api('update'))
}
