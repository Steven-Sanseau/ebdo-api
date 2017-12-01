import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import env from '../lib/env'
import loger from '../lib/logger'

const db = {}

// connect to postgres db
const sequelize = new Sequelize(
  env.POSTGRESDB,
  env.POSTGRESUSER,
  env.POSTGRESPASSWORD,
  {
    dialect: 'postgres',
    port: env.POSTGRESPORT,
    host: env.POSTGRESHOST,
    dialectOptions: {
      ssl: true
    }
  }
)

const modelsDir = path.normalize(`${__dirname}/../models`)

// loop through all files in models directory ignoring hidden files and this file
fs
  .readdirSync(modelsDir)
  .filter(file => file.indexOf('.') !== 0 && file.indexOf('.map') === -1)
  // import model files and save model names
  .forEach(file => {
    loger.debug(`Loading model file ${file}`)
    const model = sequelize.import(path.join(modelsDir, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// Synchronizing any model changes with database.
sequelize.sync().then(err => {
  if (err.message) {
    loger.error(err.message)
  }
  loger.debug('Database synchronized')
})

// assign the sequelize variables to the db object and returning the db.
export default _.extend(
  {
    sequelize,
    Sequelize
  },
  db
)
