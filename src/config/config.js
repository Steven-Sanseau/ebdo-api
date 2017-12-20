// This file is used only for sequelize-cli

module.exports = {
  development: {
    username: process.env.POSTGRESUSER,
    password: process.env.POSTGRESPASSWORD,
    database: process.env.POSTGRESDB,
    host: process.env.POSTGRESHOST,
    dialect: 'postgres'
  },
  staging: {
    username: process.env.POSTGRESUSER,
    password: process.env.POSTGRESPASSWORD,
    database: process.env.POSTGRESDB,
    host: process.env.POSTGRESHOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  },
  production: {
    username: process.env.POSTGRESUSER,
    password: process.env.POSTGRESPASSWORD,
    database: process.env.POSTGRESDB,
    host: process.env.POSTGRESHOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
}
