import { createController } from 'awilix-koa'

const api = checkoutService => ({
  createCheckout: async ctx =>
    ctx.created(await checkoutService.create(ctx.request.body)),
  updateCheckout: async ctx =>
    ctx.created(await checkoutService.update(ctx.params.id, ctx.request.body))
})

export default createController(api)
  .prefix('/v1/checkout')
  .post('', 'createCheckout')
  .patch('/:id', 'updateCheckout')
