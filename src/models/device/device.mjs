import db from "../../config/dbConnection.mjs";
import Sequelize from "../../config/dbConnection.mjs";

const Device = db.define('Device', {
  id: {
    type: "SERIAL",
    primaryKey: true
  },
  macAdress: {
      type: 'VARCHAR(17)',
      allowNull: false
  }
}, {
  timestamps: false
})

Sequelize.sync({logging: false})

export default Device
