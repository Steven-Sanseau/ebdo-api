export default (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    subscription_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    aboweb_subscription_id: {
      type: DataTypes.INTEGER
    },
    aboweb_client_id: {
      type: DataTypes.INTEGER
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
    }
  })

  return Subscription
}
