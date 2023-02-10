import db from "../../config/dbConnection.mjs";

const Device = db.define('Device', {
  id: {
    type: "INTEGER",
    autoIncrement: true,
    primaryKey: true
  },
  macAddress: {
      type: 'VARCHAR(17)',
      allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'device'
})

export default Device