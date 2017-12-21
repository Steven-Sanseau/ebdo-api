export default (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    client_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    aboweb_client_id: {
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
    },
    type_client: {
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    login_code: {
      type: DataTypes.INTEGER
    }
  })

  Client.associate = models => {
    Client.hasMany(models.Address, {
      foreignKey: 'fk_address_clients',
      targetKey: 'client_id'
    })

    Client.hasMany(models.Checkout, {
      foreignKey: 'fk_client_id',
      targetKey: 'client_id'
    })
  }

  return Client
}
