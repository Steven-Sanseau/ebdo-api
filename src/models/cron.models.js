export default (sequelize, DataTypes) => {
  const Cron = sequelize.define('Cron', {
    cron_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING
    },
    data: {
      type: DataTypes.JSON
    },
    last_record_updated_at: {
      type: DataTypes.DATE
    }
  })

  return Cron
}
