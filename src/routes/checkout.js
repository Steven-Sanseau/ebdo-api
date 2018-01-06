import { createController } from 'awilix-koa'

const api = checkoutService => ({
  createCheckout: async ctx =>
    ctx.created(await checkoutService.create(ctx.request.body)),
  updateConsumerAbowebCheckout: async ctx =>
    ctx.created(
      await checkoutService.updateAboweb(ctx.params.id, ctx.request.body)
    )
})

export default createController(api)
  .prefix('/v1/checkout')
  .post('', 'createCheckout')
  .patch('/aboweb/:id', 'updateConsumerAbowebCheckout')
