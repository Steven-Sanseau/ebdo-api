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
    aboweb_client_id: {
      type: DataTypes.INTEGER
    },
    aboweb_subscribe_id: {
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
    Checkout.belongsTo(models.Client, { foreignKey: 'client_id' })

    Checkout.belongsTo(models.Token, { foreignKey: 'token_id' })

    Checkout.belongsTo(models.Address, {
      as: 'invoice_address',
      foreignKey: 'invoice_address_id'
    })
    Checkout.belongsTo(models.Address, {
      as: 'delivery_address',
      foreignKey: 'delivery_address_id'
    })

    Checkout.belongsTo(models.Offer, { foreignKey: 'offer_id' })
  }

  return Checkout
}
