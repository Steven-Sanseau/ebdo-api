import { createController } from 'awilix-koa'

const api = () => ({
  loaderVerifCode: async ctx =>
    ctx.ok('loaderio-cb0ad7dc39f54ef42bad240bb6ba7167')
})

export default createController(api)
  .prefix('/')
  .get('loaderio-cb0ad7dc39f54ef42bad240bb6ba7167', 'loaderVerifCode')
