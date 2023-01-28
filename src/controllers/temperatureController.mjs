import { lastData, limitData, allData, byId } from "../models/temperature/select.mjs";
import { insertData } from "../models/temperature/insert.mjs";
import Logger from "../logs/logger.mjs";
const { logError } = new Logger();

const path = 'temperatureController'
  
const getAll = (req, res) => {
  allData().then(data => {
    res.status(200).json(data);
  })
}

const getById = (req, res) => {
  const id = req.params.number;

  byId(id).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    logError(err, path)
  })
}

const getLimitData = (req, res) => {
  const { start, limit } = req.query;

  limitData(parseInt(start), parseInt(limit)).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    logError(err, path)
  })
}

const getLatestData = (req, res) => {
  lastData().then(data => {
    res.status(201).json(data)
  }).catch(err => {
    logError(err, path)
  })
}

const createData = (req, res) => {
  req.on('data', (data) => {
    const jsonData = JSON.parse(data)

    const date = new Date()
    jsonData.dateHour = new Date(date.setUTCHours(date.getUTCHours() - 3)).toISOString()

    insertData(jsonData)
    res.status(200).send(['Dados Inseridos com Sucesso!', jsonData])
  })
}

export { getAll, getById, getLimitData, getLatestData, createData }