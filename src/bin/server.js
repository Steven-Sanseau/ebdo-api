import { createServer } from '../lib/server'
import { logger } from '../lib/logger'
import { env } from '../lib/env'

createServer().then(
  app => {
    app.listen(process.env.PORT, () => {
      const mode = process.env.NODE_ENV
      logger.debug(
        `Server listening on ${process.env.PORT} http://localhost:${
          process.env.PORT
        }/ in ${mode} mode`
      )
    })
  },
  err => {
    logger.error('Error while starting up server', err)
    process.exit(1)
  }
)
