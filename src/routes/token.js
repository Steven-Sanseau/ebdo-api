import { createController } from 'awilix-koa'

const api = tokenService => ({
  createToken: async ctx =>
    ctx.created(await tokenService.create(ctx.request.body)),
  updateAbowebConsumerToken: async ctx =>
    ctx.ok(await tokenService.updateAboweb(ctx.params.id, ctx.request.body)),
  validateSlimpayToken: async ctx =>
    ctx.ok(await tokenService.validTokenSlimpay(ctx.params.id)),
  getIframe: async ctx =>
    ctx.ok(
      await tokenService.createTokenSlimpay(
        ctx.params.client,
        ctx.params.address
      )
    )
})

export default createController(api)
  .prefix('/v1/token')
  .get('/slimpay/iframe/:client/:address', 'getIframe')
  .post('', 'createToken')
  .get('/slimpay/valid/:id', 'validateSlimpayToken')
  .patch('/aboweb/:id', 'updateAbowebConsumerToken')
