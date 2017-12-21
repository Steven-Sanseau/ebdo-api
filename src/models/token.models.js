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
    token_type: {
      type: DataTypes.STRING
    },
    token_stripe_id: {
      type: DataTypes.STRING
    },
    stripe_custom_id: {
      type: DataTypes.STRING
    },
    card_stripe_id: {
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
