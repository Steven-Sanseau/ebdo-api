import { Client } from './client.models'

export default (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token_stripe: {
      type: DataTypes.STRING
    },
    rum_slimpay: {
      type: DataTypes.STRING
    }
  })

  Token.associate = models => {
    Token.belongsTo(models.Client, { targetKey: 'client_id' })
  }

  return Token
}
