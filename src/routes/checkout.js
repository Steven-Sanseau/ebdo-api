import { createController } from 'awilix-koa'

const api = checkoutService => ({})

export default createController(api).prefix('/v1/checkout')
