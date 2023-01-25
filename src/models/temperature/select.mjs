import Temperature from "./temperature.mjs";

const allData = async () => {
  return Temperature.findAll();
}

const byId = async (id) => {
  return Temperature.findOne({
    where: {
      id: id
    }
  })
}

const limitData = async (start, limit) => {
  return Temperature.findAll({
    offset: start,
    limit: limit
  })
}

const lastData = async () => {
  return Temperature.findOne({
    order: [['id', 'DESC']]
  })
}

export { lastData, limitData, allData, byId };

 