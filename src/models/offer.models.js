export default (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    offer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    aboweb_id: {
      type: DataTypes.STRING
    },
    price_ttc: {
      type: DataTypes.FLOAT
    },
    monthly_price_ttc: {
      type: DataTypes.FLOAT
    },
    description: {
      type: DataTypes.TEXT
    },
    time_limited: {
      type: DataTypes.BOOLEAN
    },
    duration: {
      type: DataTypes.INTEGER
    },
    country_shipping: {
      type: DataTypes.STRING
    },
    shipping_cost: {
      type: DataTypes.FLOAT
    },
    is_gift: {
      type: DataTypes.BOOLEAN
    },
    is_free: {
      type: DataTypes.BOOLEAN
    },
    is_free_gift: {
      type: DataTypes.BOOLEAN
    },
    payment_method: {
      type: DataTypes.INTEGER
    }
  })

  Offer.associate = models => {
    Offer.hasMany(models.Checkout, {
      targetKey: 'checkout_id',
      foreignKey: 'offer_id'
    })
  }

  return Offer
}
