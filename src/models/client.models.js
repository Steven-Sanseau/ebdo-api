export default (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    client_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    abboweb_client_id: {
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
  })

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
