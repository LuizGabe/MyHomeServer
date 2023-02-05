import weatherOperation from "../models/weather/operation.mjs";
import Logger from "../logs/logger.mjs";

const Weather = weatherOperation()

const path = 'weatherController'

const { logError } = new Logger();

const getAll = (req, res) => {
  Weather.all().then(data => {
    res.status(200).json(data);
  })
}

const getById = (req, res) => {
  const id = req.params.number;

  Weather.searchById(id).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    logError(err, path)
  })
}

const getLimitData = (req, res) => {
  const { start, limit } = req.query;

  Weather.searchStartLimit(parseInt(start), parseInt(limit)).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    logError(err, path)
  })
}

const getLatestData = (req, res) => {
  Weather.latest().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    logError(err, path)
  })
}

const createData = (req, res) => {
  console.time('createData')
  req.on('data', (data) => {
    const jsonData = JSON.parse(data)

    jsonData.dateHour = new Date(new Date().setUTCHours(new Date().getUTCHours() - 3)).toISOString()

    Weather.create(jsonData).then(data => {
      if(data.id != null) {
        res.status(200).json(data)
        console.timeEnd('createData')
      } else {
        Weather.latest().then(data => {
          res.status(200).json(data)
          console.timeEnd('createData')
        })
      }
      
    })
  })
}

export { getAll, getById, getLimitData, getLatestData, createData }