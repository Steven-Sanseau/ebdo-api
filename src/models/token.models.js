import { Client } from './client.models'

export default (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING
    },
    stripe_id: {
      type: DataTypes.STRING
    },
    bic: {
      type: DataTypes.STRING
    },
    iban: {
      type: DataTypes.STRING
    }
  })

  return Token
}
