import db from "../../config/dbConnection.mjs";
import Sequelize from "../../config/dbConnection.mjs";

const Device = db.define('Device', {
  id: {
    type: "SERIAL",
    primaryKey: true
  },
  macAddress: {
      type: 'VARCHAR(17)',
      allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Device'
})

Sequelize.sync()

export default Device
