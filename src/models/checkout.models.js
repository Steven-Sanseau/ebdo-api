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
      type: DataTypes.STRING
    },
    adress_id: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    token_id: {
      type: DataTypes.STRING
    },
    offer_id: {
      type: DataTypes.STRING
    },
    payment_method: {
      type: DataTypes.ENUM('CB', 'SEPA')
    },
    status: {
      type: DataTypes.STRING
    }
  })

  Checkout.associate = models => {
    Checkout.belongsTo(models.Client)
  }

  return Checkout
}
