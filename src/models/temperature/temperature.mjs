import db from "../../config/dbConnection.mjs";
import Sequelize from "../../config/dbConnection.mjs";

const Temperature = db.define('temperature', {
  id: {
    type: "SERIAL",
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
  dateHour: {
      type: 'VARCHAR(30)',
      allowNull: false,
  }
}, {
  timestamps: false
});

Sequelize.sync({logging: false})

export default Temperature
