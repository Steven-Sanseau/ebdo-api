// This file is used only for sequelize-cli
const yenv = require('yenv');
const config = yenv();

module.exports = {
  development: {
    username: config.POSTGRESUSER,
    password: config.POSTGRESPASSWORD,
    database: config.POSTGRESDB,
    host: config.POSTGRESHOST,
    dialect: 'postgres'
  },
  production: {
    username: config.POSTGRESUSER,
    password: config.POSTGRESPASSWORD,
    database: config.POSTGRESDB,
    host: config.POSTGRESHOST,
    dialect: 'postgres'
  }
}
