export default (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      abboWebId: {
        type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      last_name: {
        type: DataTypes.STRING
      },
      first_name: {
        type: DataTypes.STRING
      },
      adress: {
        type: DataTypes.STRING
      },
      adress_bis: {
        type: DataTypes.STRING
      },
      locality: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      postal_code: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      cgv: {
        type: DataTypes.BOOLEAN
      },
      company: {
        type: DataTypes.STRING
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

  return Client
}
