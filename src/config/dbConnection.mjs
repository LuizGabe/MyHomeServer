import Sequelize from 'sequelize';
import getConfig from '../config/configCondition.mjs';
import Logger from '../logs/logger.mjs';

const { logSuccess, logError } = new Logger();

const config = getConfig()

const path = 'dbConnection';

const sequelize = new Sequelize(config.db);

sequelize
.authenticate({logging: false})
.then(() => {
  logSuccess('Conexão com o banco de dados realizada com sucesso', path)
})
.catch(err => {
  logError(err, path)
});

sequelize.sync({logging: false}).then(() => {
  logSuccess('Tabelas sincronizadas com sucesso', path)
})

export default sequelize;