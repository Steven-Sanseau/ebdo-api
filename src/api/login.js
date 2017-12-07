import { makeClassInvoker } from 'awilix-koa'
import Paginator from 'paginator'
import _ from 'lodash'

class LoginAPI {
  constructor({ loginService }) {
    this.loginService = loginService
  }

  async getCodeLogin(ctx) {
    console.log(ctx.params)
    const body = await this.loginService.sendCodeLogin(ctx.params.email)
    ctx.status = 201
    ctx.ok(body)
  }
}

export default function(router) {
  const api = makeClassInvoker(LoginAPI)

  router.get('/code/:email', api('getCodeLogin'))
}
