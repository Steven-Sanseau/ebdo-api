export default (sequelize, DataTypes) => {
  const Newsletter = sequelize.define('Newsletter', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return Newsletter
}
