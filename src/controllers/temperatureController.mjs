import { lastData, limitData, allData, byId } from "../models/temperature/select.mjs";
import { insertData } from "../models/temperature/insert.mjs";
  
const getAll = (req, res) => {
  allData().then(data => {
    res.status(200).json(data);
  })
}

const getById = (req, res) => {
  const id = req.params.number;

  byId(id).then(data => {
    res.status(200).json(data);
  })
}

const getLimitData = (req, res) => {
  const { start, limit } = req.query;

  limitData(parseInt(start), parseInt(limit)).then(data => {
    console.log(data)
    res.json(data)
  }).catch(err => {
    // TODO: Add code to getLatestData error log
  })
}

const getLatestData = (req, res) => {
  lastData().then(data => {
    res.json(data)
  }).catch(err => {
    // TODO: Add code to getLatestData error log
  })
}

const createData = (req, res) => {
  req.on('data', (data) => {

    const jsonData = JSON.parse(data)

    const date = new Date()
    jsonData.dateHour = new Date(date.setUTCHours(date.getUTCHours() - 3)).toISOString()

    insertData(jsonData)
    res.statusCode = 200
    res.send('Dados de temperatura recebidos e salvos no arquivo.')
  })
}

export { getAll, getById, getLimitData, getLatestData, createData }