export default (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
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
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
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
  })

  return Client
}
