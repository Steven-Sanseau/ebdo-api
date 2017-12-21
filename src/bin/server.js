import { createServer } from '../lib/server'
import { logger } from '../lib/logger'
import { env } from '../lib/env'
const port = env.PORT || process.env.PORT
createServer().then(
  app => {
    app.listen(env.PORT, () => {
      const mode = env.NODE_ENV
      logger.debug(
        `Server listening on ${env.PORT} http://localhost:${
          env.PORT
        }/ in ${mode} mode`
      )
    })
  },
  err => {
    logger.error('Error while starting up server', err)
    process.exit(1)
  }
)
