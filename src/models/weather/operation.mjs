import Weather from "./weather.mjs";
import Logger from "../../logs/logger.mjs";
const { logSuccess, logError } = new Logger();

const path = 'weatherOperation'

function Operations() {
  const all = async () => {
    return Weather.findAll();
  }

  const searchById = async (id) => {
    return Weather.findOne({
      where: {
        id: id
      }
    })
  }

  const searchStartLimit = async (start, limit) => {
    return Weather.findAll({
      offset: start-1,
      limit: limit
    })
  }

  const latest = async () => {
    return Weather.findOne({
      order: [['id', 'DESC']]
    })
  }

  const create = (data) => Weather.create(data)
  
  return {
    all,
    searchById,
    searchStartLimit,
    latest,
    create
  }
}

export default Operations