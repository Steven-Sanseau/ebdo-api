import { Client } from './client.models'

export default (sequelize, DataTypes) => {
  const Adress = sequelize.define(
    'Adress',
    {
      adress_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      client_id: {
        type: DataTypes.INTEGER
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
      city: {
        type: DataTypes.STRING
      },
      postal_code: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
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
    },
    {
      classMethods: {
        associate: function(models) {
          Client.belongsTo(models.client, {
            foreignKey: 'client_id',
            constraints: false
          })
        }
      },
      tableName: 'Client'
    }
  )

  return Adress
}
