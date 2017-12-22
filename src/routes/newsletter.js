import { createController } from 'awilix-koa'

const api = newsletterService => ({
  getNewsletter: async ctx =>
    ctx.ok(await newsletterService.findByEmail(ctx.params.email)),
  createNewsletter: async ctx =>
    ctx.created(await newsletterService.create(ctx.request.body)),
  updateNewsletter: async ctx =>
    ctx.ok(await newsletterService.update(ctx.params.email, ctx.request.body))
})

export default createController(api)
  .prefix('/v1/newsletter')
  .get('/:email', 'getNewsletter')
  .post('', 'createNewsletter')
  .patch('/:email', 'updateNewsletter')
