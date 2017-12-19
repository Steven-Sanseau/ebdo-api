export default (sequelize, DataTypes) => {
  const Checkout = sequelize.define('Checkout', {
    checkout_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    checkout_step: {
      type: DataTypes.INTEGER
    },
    client_id: {
      type: DataTypes.INTEGER
    },
    cookie_id: {
      type: DataTypes.INTEGER
    },
    adress_delivery_id: {
      type: DataTypes.INTEGER
    },
    adress_invoice_id: {
      type: DataTypes.INTEGER
    },
    token_id: {
      type: DataTypes.INTEGER
    },
    offer_id: {
      type: DataTypes.INTEGER
    },
    payment_method: {
      type: DataTypes.ENUM('CB', 'SEPA')
    },
    status: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.STRING
    }
  })

  Checkout.associate = models => {
    Checkout.belongsTo(models.Client, { targetKey: 'client_id' })

    Checkout.belongsTo(models.Token, { targetKey: 'token_id' })

    Checkout.belongsTo(models.Offer, { targetKey: 'offer_id' })
  }

  return Checkout
}
