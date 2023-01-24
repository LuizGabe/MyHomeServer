import { existsSync, readFileSync, writeFileSync } from 'fs';

const configFile = 'src/config/dbConnect.json';

function createConfigFile() {
  let config = {
    "host": "host",
    "user": "user",
    "password": "password",
    "dialect": "dialect",
    "database": "database"
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