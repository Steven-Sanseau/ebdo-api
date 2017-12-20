export default (sequelize, DataTypes) => {
  const Voucher = sequelize.define('Voucher', {
    voucher_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    abboweb_id: {
      type: DataTypes.INTEGER
    },
    voucher: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    start_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    end_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    }
  })

  return Voucher
}
