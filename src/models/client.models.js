export default (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      client_id: {
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
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
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

  Client.associate = models => {
    Client.hasMany(models.Adress, {
      foreignKey: 'fk_adress_clients',
      targetKey: 'client_id'
    })

    Client.hasMany(models.Checkout, {
      foreignKey: 'fk_client_id',
      targetKey: 'client_id'
    })
  }

  return Client
}
