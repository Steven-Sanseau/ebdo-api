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
    firstNumberDelivered: {
      type: DataTypes.INTEGER
    },
    lastNumberDelivered: {
      type: DataTypes.INTEGER
    },
    isInvoiced: {
      type: DataTypes.BOOLEAN,
    },
    isSuspended: {
      type: DataTypes.BOOLEAN
    },
    isResubscription: {
      type: DataTypes.BOOLEAN
    },
    freeSubscription: {
      type: DataTypes.BOOLEAN
    },
    numberOfCopy: {
      type: DataTypes.INTEGER
    },
    order_number: {
      type: DataTypes.STRING,
    }
  })

  return Subscription
}
