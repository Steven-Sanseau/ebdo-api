export default (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    price_ht: {
      type: DataTypes.FLOAT
    },
    price_ttc: {
      type: DataTypes.FLOAT
    },
    to_serve: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT
    },
    ref: {
      type: DataTypes.INTEGER
    },
    time_limited: {
      type: DataTypes.BOOLEAN
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })

  return Offer
}
