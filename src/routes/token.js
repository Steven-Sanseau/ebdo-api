import { createController } from 'awilix-koa'

const api = tokenService => ({
  createToken: async ctx =>
    ctx.created(await tokenService.create(ctx.request.body)),
  updateAbowebConsumerToken: async ctx =>
    ctx.ok(await tokenService.updateAboweb(ctx.params.id, ctx.request.body)),
  getIframe: async ctx =>
    ctx.ok(
      await tokenService.getIframeSlimpay(ctx.params.client, ctx.params.address)
    )
})

export default createController(api)
  .prefix('/v1/token')
  .get('/slimpay/iframe/:client/:address', 'getIframe')
  .post('', 'createToken')
  .patch('/aboweb/:id', 'updateAbowebConsumerToken')
