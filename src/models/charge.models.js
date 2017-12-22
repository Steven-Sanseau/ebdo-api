export default (sequelize, DataTypes) => {
  const Charge = sequelize.define('Charge', {
    charge_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    stripe_charge_return: {
      type: DataTypes.JSON
    }
  })

  Charge.associate = models => {
    Charge.belongsTo(models.Checkout, { foreignKey: 'checkout_id' })
    Charge.belongsTo(models.Token, { foreignKey: 'token_id' })
    Charge.belongsTo(models.Client, { foreignKey: 'client_id' })
  }

  return Charge
}
