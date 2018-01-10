export default (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    last_name: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address_post: {
      type: DataTypes.STRING
    },
    address_pre: {
      type: DataTypes.STRING
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
    },
    address_equal: {
      type: DataTypes.BOOLEAN
    },
    aboweb_address_id: {
      type: DataTypes.STRING
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['type_address', 'client_id']
      }
    ]
  }
  )

  Address.associate = models => {
    Address.belongsTo(models.Client, {
      foreignKey: { name: 'client_id', allowNull: false }
    })

    Address.hasOne(models.Checkout, {
      as: 'invoice_address',
      foreignKey: 'address_id',
      targetKey: 'checkout_id'
    })

    Address.hasOne(models.Checkout, {
      as: 'delivery_address',
      foreignKey: 'address_id',
      targetKey: 'checkout_id'
    })
  }

  return Address
}
