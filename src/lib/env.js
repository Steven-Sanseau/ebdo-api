import yenv from 'yenv'
import { keyblade } from 'keyblade'
import { logger } from './logger'

process.env.NODE_ENV = process.env.NODE_ENV || 'developpment'

export const env = keyblade(yenv(), {
  message: key => `[yenv] ${key} not found in the loaded environment`,
  logBeforeThrow: message => logger.error(message)
})
