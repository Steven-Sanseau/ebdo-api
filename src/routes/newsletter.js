import { createController } from 'awilix-koa'

const api = newsletterService => ({
  // findNewsletter: async ctx => ctx.ok(await newsletterService.find(ctx.query)),
  getNewsletter: async ctx =>
    ctx.ok(await newsletterService.findByEmail(ctx.params.email)),
  createNewsletter: async ctx =>
    ctx.created(await newsletterService.create(ctx.request.body)),
  updateNewsletter: async ctx =>
    ctx.ok(await newsletterService.update(ctx.params.email, ctx.request.body))
  // removeNewsletter: async ctx =>
  //   ctx.noContent(await newsletterService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/v1/newsletter')
  // .get('', 'findNewsletter')
  .get('/:email', 'getNewsletter')
  .post('', 'createNewsletter')
  .patch('/:email', 'updateNewsletter')
// .delete('/:id', 'removeNewsletter')
