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
    aboweb_client_id: {
      type: DataTypes.INTEGER
    },
    aboweb_subscribe_id: {
      type: DataTypes.INTEGER
    },
    address_delivery_id: {
      type: DataTypes.INTEGER
    },
    address_invoice_id: {
      type: DataTypes.INTEGER
    },
    token_id: {
      type: DataTypes.INTEGER
    },
    offer_id: {
      type: DataTypes.INTEGER
    },
    payment_method: {
      type: DataTypes.INTEGER
    },
    is_gift: {
      type: DataTypes.BOOLEAN
    },
    status: {
      type: DataTypes.STRING
    },
    cgv_accepted: {
      type: DataTypes.BOOLEAN
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
