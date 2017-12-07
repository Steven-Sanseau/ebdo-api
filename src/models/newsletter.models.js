export default (sequelize, DataTypes) => {
  const Newsletter = sequelize.define('Newsletter', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING
    }
  })

  return Newsletter
}
