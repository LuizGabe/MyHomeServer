import { existsSync, readFileSync, writeFileSync } from 'fs';

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
  // TODO: Add code to log in to your database 
}

export default function getConfig() {
  if (existsSync(configFile)) {
    return JSON.parse(readFileSync(configFile).toString());
  } else {
    createConfigFile()
  }
}