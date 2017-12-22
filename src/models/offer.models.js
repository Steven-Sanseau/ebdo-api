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
    price_ht: {
      type: DataTypes.FLOAT
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
    ref: {
      type: DataTypes.INTEGER
    },
    time_limited: {
      type: DataTypes.BOOLEAN
    },
    duration: {
      type: DataTypes.INTEGER
    },
    shipping_cost: {
      type: DataTypes.FLOAT
    },
    is_gift: {
      type: DataTypes.BOOLEAN
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
