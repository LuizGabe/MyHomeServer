import Temperature from "./temperature.mjs";
import Logger from "../../logs/logger.mjs"
const { logSuccess, logError } = new Logger()

const insertData = (data) => {
  Temperature.create(data).then(() => {
    logSuccess('Salvo no temperature com sucesso', 'temperatureInsert')
  }).catch(err => {
    logError(err, 'temperatureInsert')
  })
}

export { insertData }