import db from "../../config/dbConnection.mjs";
import Sequelize from "../../config/dbConnection.mjs";
import Device from "../device/device.mjs";

const Weather = db.define('weather', {
  id: {
    type: "INTEGER",
    autoIncrement: true,
    primaryKey: true
  },
  humidity: {
      type: 'INTEGER',
      allowNull: false
  },
  temperature: {
      type: 'FLOAT',
      allowNull: false
  },
  deviceId: {
      type: 'INTEGER',
      allowNull: false
  },
  dateHour: {
      type: 'VARCHAR(30)',
      allowNull: false,
  }
}, {
  timestamps: false
});

Weather.belongsTo(Device, {
  foreignKey: 'deviceId'
})

export default Weather