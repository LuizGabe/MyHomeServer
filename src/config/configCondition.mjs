import { existsSync, readFileSync, writeFileSync } from 'fs';
import Logger from '../logs/logger.mjs';
const { logWarning } = new Logger()

const configFile = 'src/config/dbConnect.json';

function createConfigFile() {
  let config = {
    "db": {
      "host": "host",
      "username": "user",
      "password": "password",
      "dialect": "dialect",
      "database": "database"
    },
    "main": {
      "port": "port"
    }
  }
  writeFileSync(configFile, JSON.stringify(config, null, 2));
  logWarning('Arquivo de configuração criado, edite o arquivo e reinicie o servidor!', 'configCondition');
}

export default function getConfig() {
  if (existsSync(configFile)) {
    return JSON.parse(readFileSync(configFile).toString());
  } else {
    createConfigFile()
    process.exit(1)
  }
}