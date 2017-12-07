import { createController } from 'awilix-koa'

const api = newsletterService => ({
  findNewsletter: async ctx => ctx.ok(await newsletterService.find(ctx.query)),
  getNewsletter: async ctx =>
    ctx.ok(await newsletterService.get(ctx.params.id)),
  createNewsletter: async ctx =>
    ctx.created(await newsletterService.create(ctx.request.body)),
  updateNewsletter: async ctx =>
    ctx.ok(await newsletterService.update(ctx.params.id, ctx.request.body)),
  removeNewsletter: async ctx =>
    ctx.noContent(await newsletterService.remove(ctx.params.id))
})

export default createController(api)
  .prefix('/newsletter')
  .get('', 'findNewsletter')
  .get('/:id', 'getNewsletter')
  .post('', 'createNewsletter')
  .patch('/:id', 'updateNewsletter')
  .delete('/:id', 'removeNewsletter')
