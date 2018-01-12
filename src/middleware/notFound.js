export async function notFoundHandler(ctx) {
  const msg = `${ctx.request.method} ${ctx.request.path}`
  ctx.notFound({
    message: `Hello :)`
  })
}
