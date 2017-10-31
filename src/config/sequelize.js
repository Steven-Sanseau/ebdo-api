import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import env from '../lib/env'

const db = {}

// connect to postgres db
const sequelize = new Sequelize(
  env.POSTGRESDB,
  env.POSTGRESUSER,
  env.POSTGRESPASSWORD,
  {
    dialect: 'postgres',
    port: POSTGRESPORT,
    host: POSTGRESHOST
  }
)

const modelsDir = path.normalize(`${__dirname}/../models`)

// loop through all files in models directory ignoring hidden files and this file
fs
  .readdirSync(modelsDir)
  .filter(file => file.indexOf('.') !== 0 && file.indexOf('.map') === -1)
  // import model files and save model names
  .forEach(file => {
    console.log(`Loading model file ${file}`)
    const model = sequelize.import(path.join(modelsDir, file))
    db[model.name] = model
  })

// Synchronizing any model changes with database.
sequelize.sync().then(err => {
  if (err) console.log('An error occured %j', err)
  else console.log('Database synchronized')
})

// assign the sequelize variables to the db object and returning the db.
export default _.extend(
  {
    sequelize,
    Sequelize
  },
  db
)
