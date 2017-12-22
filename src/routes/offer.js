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
  }
})

export default createController(api)
  .prefix('/v1/offer')
  .get('/:duration/:price/:gift', 'findOffer')
