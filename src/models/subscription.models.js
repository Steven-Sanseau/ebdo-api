export default (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    subscription_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    aboweb_subscription_id: {
      type: DataTypes.INTEGER,
      unique: true
    },
    aboweb_client_id: {
      type: DataTypes.INTEGER
    },
    aboweb_offer_id: {
      type: DataTypes.STRING
    },
    first_number_delivered: {
      type: DataTypes.INTEGER
    },
    last_number_delivered: {
      type: DataTypes.INTEGER
    },
    is_invoiced: {
      type: DataTypes.BOOLEAN
    },
    is_suspended: {
      type: DataTypes.BOOLEAN
    },
    is_resubscription: {
      type: DataTypes.BOOLEAN
    },
    free_subscription: {
      type: DataTypes.BOOLEAN
    },
    number_of_copy: {
      type: DataTypes.INTEGER
    },
    order_number: {
      type: DataTypes.STRING
    },
    begin_at: {
      type: DataTypes.DATE
    },
    end_at: {
      type: DataTypes.DATE
    },
    invoiced_number: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    }
  })

  Subscription.associate = models => {
    Subscription.hasOne(models.Offer, {
      targetKey: 'aboweb_offer_id',
      foreignKey: 'aboweb_id',
      constraints: false
    })
  }

  return Subscription
}
