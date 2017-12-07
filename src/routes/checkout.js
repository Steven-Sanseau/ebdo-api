import { createController } from 'awilix-koa'

const api = checkoutService => ({
  findCheckout: async ctx => ctx.ok(await checkoutService.find(ctx.query)),
  getCheckout: async ctx => ctx.ok(await checkoutService.get(ctx.params.id)),
  createCheckout: async ctx =>
    ctx.created(await checkoutService.create(ctx.request.body)),
  updateCheckout: async ctx =>
    ctx.ok(await checkoutService.update(ctx.params.id, ctx.request.body)),
  removeCheckout: async ctx =>
    ctx.noContent(await checkoutService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/checkout')
  .get('', 'findCheckout')
  .get('/:id', 'getCheckout')
  .post('', 'createCheckout')
  .patch('/:id', 'updateCheckout')
  .delete('/:id', 'removeCheckout')
