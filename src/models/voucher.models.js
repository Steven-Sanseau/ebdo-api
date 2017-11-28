export default (sequelize, DataTypes) => {
  const Voucher = sequelize.define(
    'Voucher',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      abboWebId: {
        type: DataTypes.INTEGER
      },
      Voucher: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATE
      },

      end_date: {
        type: DataTypes.DATE
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

  return Voucher
}
