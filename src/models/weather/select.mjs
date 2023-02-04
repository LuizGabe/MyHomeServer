import Weather from "./weather.mjs";

const allData = async () => {
  return Weather.findAll();
}

const byId = async (id) => {
  return Weather.findOne({
    where: {
      id: id
    }
  })
}

const limitData = async (start, limit) => {
  return Weather.findAll({
    offset: start,
    limit: limit
  })
}

const lastData = async () => {
  return Weather.findOne({
    order: [['id', 'DESC']]
  })
}

export { lastData, limitData, allData, byId };

 