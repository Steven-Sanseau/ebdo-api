export default (sequelize, DataTypes) => {
  const Checkout = sequelize.define(
    'Checkout',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    },
    {
      setterMethods: {
        id: function(value) {
          if (!this.isNewRecord) {
            throw new sequelize.ValidationError(null, [
              new sequelize.ValidationErrorItem(
                'readonly',
                'id may not be set',
                'id',
                value
              )
            ])
          }
        }
      }
    }
  )

  return Checkout
}
