/**
 * The "Not Found" handler.
 *
 * @param  {Koa.Context} ctx
 * The Koa context.
 */
export default function notFoundHandler(ctx) {
  ctx.notFound('There is nothing to see 😈')
}
