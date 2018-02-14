import { createController } from 'awilix-koa'

const api = checkoutService => ({
  createCheckout: async ctx =>
    ctx.created(await checkoutService.create(ctx.request.body)),
  godfatherGift: async ctx =>
    ctx.created(
      await checkoutService.exportGodfatherGift(
        ctx.params.fromDate,
        ctx.params.endDate
      )
    ),
  updateConsumerAbowebCheckout: async ctx =>
    ctx.created(
      await checkoutService.updateAboweb(ctx.params.id, ctx.request.body)
    )
})

export default createController(api)
  .prefix('/v1/checkout')
  .post('', 'createCheckout')
  .get('/aboweb/gift/:fromDate/:endDate', 'godfatherGift')
  .patch('/aboweb/:id', 'updateConsumerAbowebCheckout')
