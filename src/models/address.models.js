import { Client } from './client.models'

export default (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    phone: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    company: {
      type: DataTypes.STRING
    },
    type_address: {
      type: DataTypes.STRING
    }
  })

  Address.associate = models => {
    Address.belongsTo(models.Client, { targetKey: 'client_id' })
  }

  return Address
}