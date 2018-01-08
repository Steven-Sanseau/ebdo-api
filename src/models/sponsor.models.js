export default (sequelize, DataTypes) => {
  const Sponsor = sequelize.define('Sponsor', {
    sponsor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING
    },
    has_been_used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })

  Sponsor.associate = models => {
    Sponsor.belongsTo(models.Client, {
      as: 'godfather',
      foreignKey: 'godfather_id'
    })

    Sponsor.belongsTo(models.Client, { as: 'godson', foreignKey: 'godson_id' })

    Sponsor.belongsTo(models.Subscription, { foreignKey: 'subscription_id' })

    Sponsor.belongsTo(models.Token, { foreignKey: 'token_id' })

    Sponsor.belongsTo(models.Checkout, { foreignKey: 'checkout_id' })
  }

  return Sponsor
}
