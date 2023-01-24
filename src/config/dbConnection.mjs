import Sequelize from 'sequelize';
import getConfig from '../config/configCondition.mjs';

const config = getConfig()

const sequelize = new Sequelize(config.db);

sequelize
  .authenticate()
  .then(() => {
    // TODO: Add code to log in to your database
  })
  .catch(err => {
    // TODO: Add code to error log in to your database
  });

export default sequelize;