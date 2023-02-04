import Weather from "./weather.mjs";
import Logger from "../../logs/logger.mjs"
const { logSuccess, logError } = new Logger()

const path = 'weatherInsert'

const insertData = (data) => {
  Weather.create(data).then(() => {
    logSuccess('Salvo no temperature com sucesso', path)
  }).catch(err => {
    logError(err, path)
  })
}

export { insertData }