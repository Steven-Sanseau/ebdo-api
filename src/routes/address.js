import { createController } from 'awilix-koa'
import jwtMiddleware from 'koa-jwt'
import { env } from '../lib/env'

const api = addressService => ({
  getAddress: async ctx =>
    ctx.ok(
      await addressService.findByAddressTypeAndClientId(
        ctx.params.type,
        ctx.state.user.client_id
      )
    ),
  createAddress: async ctx =>
    ctx.created(await addressService.create(ctx.request.body)),
  updateAddress: async ctx =>
    ctx.ok(await addressService.update(ctx.params.id, ctx.request.body)),
  updateAddressAboweb: async ctx =>
    ctx.ok(await addressService.updateAboweb(ctx.params.id, ctx.request.body))
})

export default createController(api)
  .prefix('/v1/address')
  .get('/:type', 'getAddress', {
    before: [jwtMiddleware({ secret: env.JWT_PRIVATE_KEY })]
  })
  .post('', 'createAddress')
  .patch('/:id', 'updateAddress')
  .patch('/aboweb/:id', 'updateAddressAboweb')
