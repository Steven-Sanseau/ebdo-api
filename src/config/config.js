// This file is used only for sequelize-cli
const yenv = require('yenv')

// Default filename is env.yaml.
const env = yenv()

module.exports = {
  development: {
    username: env.POSTGRESUSER,
    password: env.POSTGRESPASSWORD,
    database: env.POSTGRESDB,
    host: env.POSTGRESHOST,
    dialect: 'postgres'
  },
  staging: {
    username: env.POSTGRESUSER,
    password: env.POSTGRESPASSWORD,
    database: env.POSTGRESDB,
    host: env.POSTGRESHOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  },
  production: {
    username: env.POSTGRESUSER,
    password: env.POSTGRESPASSWORD,
    database: env.POSTGRESDB,
    host: env.POSTGRESHOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
}
