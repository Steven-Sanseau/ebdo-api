import { createController } from 'awilix-koa'

const api = sponsorService => ({
  findSponsor: async ctx => ctx.ok(await sponsorService.find(ctx.query)),
  getSponsor: async ctx => ctx.ok(await sponsorService.get(ctx.params.id)),
  createSponsor: async ctx =>
    ctx.created(await sponsorService.create(ctx.request.body)),
  updateSponsor: async ctx =>
    ctx.ok(await sponsorService.update(ctx.params.id, ctx.request.body)),
  removeSponsor: async ctx =>
    ctx.noContent(await sponsorService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/sponsor')
  .get('', 'findSponsor')
  .get('/:id', 'getSponsor')
  .post('', 'createSponsor')
  .patch('/:id', 'updateSponsor')
  .delete('/:id', 'removeSponsor')
