import { createController } from 'awilix-koa'

const api = voucherService => ({
  findVoucher: async ctx => ctx.ok(await voucherService.find(ctx.query)),
  getVoucher: async ctx => ctx.ok(await voucherService.get(ctx.params.id)),
  createVoucher: async ctx =>
    ctx.created(await voucherService.create(ctx.request.body)),
  updateVoucher: async ctx =>
    ctx.ok(await voucherService.update(ctx.params.id, ctx.request.body)),
  removeVoucher: async ctx =>
    ctx.noContent(await voucherService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/voucher')
  .get('', 'findVoucher')
  .get('/:id', 'getVoucher')
  .post('', 'createVoucher')
  .patch('/:id', 'updateVoucher')
  .delete('/:id', 'removeVoucher')
