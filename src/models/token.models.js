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
    stripe_token_id: {
      type: DataTypes.STRING
    },
    stripe_customer_id: {
      type: DataTypes.STRING
    },
    stripe_card_id: {
      type: DataTypes.STRING
    },
    slimpay_rum_id: {
      type: DataTypes.STRING
    },
    slimpay_token_id: {
      type: DataTypes.STRING
    },
    slimpay_rum_code: {
      type: DataTypes.STRING
    }
  })

  Token.associate = models => {
    Token.belongsTo(models.Client, { targetKey: 'client_id' })
  }

  return Token
}
