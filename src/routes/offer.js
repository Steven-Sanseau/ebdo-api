import { createController } from 'awilix-koa'

const api = offerService => ({
  findOffer: async ctx => {
    ctx.set('Cache-Control', 'public, max-age=3600')
    return ctx.ok(
      await offerService.findOffer(
        ctx.params.duration,
        ctx.params.price,
        ctx.params.gift
      )
    )
  },
  getOffer: async ctx => ctx.ok(await offerService.get(ctx.params.id)),
  createOffer: async ctx =>
    ctx.created(await offerService.create(ctx.request.body)),
  updateOffer: async ctx =>
    ctx.ok(await offerService.update(ctx.params.id, ctx.request.body)),
  removeOffer: async ctx =>
    ctx.noContent(await offerService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/offer')
  .get('/:duration/:price/:gift', 'findOffer')
  .get('/:id', 'getOffer')
  .post('', 'createOffer')
  .patch('/:id', 'updateOffer')
  .delete('/:id', 'removeOffer')
