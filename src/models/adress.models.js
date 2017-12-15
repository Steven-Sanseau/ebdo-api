import { Client } from './client.models'

export default (sequelize, DataTypes) => {
  const Adress = sequelize.define('Adress', {
    adress_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    civility: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ['M', 'MME']
      }
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
    adress: {
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
    type_adress: {
      type: DataTypes.STRING
    }
  })

  Adress.associate = models => {
    Adress.belongsTo(models.Client)
  }

  return Adress
}
