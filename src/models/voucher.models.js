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
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      start_date: {
        type: DataTypes.DATE,
        validate: {
          isDate: true
        }
      },

      end_date: {
        type: DataTypes.DATE,
        validate: {
          isDate: true
        }
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
