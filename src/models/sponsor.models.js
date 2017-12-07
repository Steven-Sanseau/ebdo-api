export default (sequelize, DataTypes) => {
  const Voucher = sequelize.define('Voucher', {
    sponsor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    client_sponsor_id: {
      type: DataTypes.INTEGER
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    checkout_id: {
      type: DataTypes.INTEGER
    }
  })

  return Voucher
}
