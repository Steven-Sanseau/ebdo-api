import yenv from 'yenv'
import { keyblade } from 'keyblade'

process.env.NODE_ENV = process.env.NODE_ENV || 'developpment'

export const env = keyblade(yenv(), {
  message: key => `[yenv] ${key} not found in the loaded environment`,
})
