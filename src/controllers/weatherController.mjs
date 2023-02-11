import weatherOperation from "../models/weather/operation.mjs";
import Logger from "../logs/logger.mjs";
import { isValidMacAddress } from "../utilities/regexTester.mjs";
import Cache from  "../utilities/cache.mjs";
import deviceOperation from "../models/device/operation.mjs";

const Weather = weatherOperation()
const Device = deviceOperation()

const path = 'weatherController'

const { logError, logDescribe } = new Logger();

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
  req.on('data', async (data) => {
    const jsonData = JSON.parse(data)
    const macAddress = req.headers['macaddress']

    logDescribe('macaddress', macAddress)
    logDescribe('jsonData', jsonData)

    if (isValidMacAddress(macAddress)) {
      let deviceData
      if (Cache.get('device') == null) {
        const data = await Device.all()
        const dadosRetornados = data.map(obj => obj.dataValues) || []
        Cache.set('device', dadosRetornados)
        deviceData = data.find((device) => device.macAddress === macAddress)
      } else {
        deviceData = Cache.get('device').find((device) => device.macAddress === macAddress)
      }
      if (!deviceData) {
        deviceData = await Device.create({ macAddress })
        const cacheAtual = Cache.get('device')
        cacheAtual.push(deviceData.dataValues)
        Cache.set('device', cacheAtual)
      }
      jsonData.dateHour = new Date(new Date().setUTCHours(new Date().getUTCHours() - 3)).toISOString()
      jsonData.deviceId = deviceData.id
      Weather.create(jsonData).then((data) => {
        logDescribe('Response', data.dataValues)
        console.timeEnd('createData')
        res.status(200).json(data.dataValues)
      }).catch(err => {
        res.status(400).send(err)
        logError(err, path)
      })
    } else {
      res.status(404).send('Add MacAddress in Header and try again')
    }
  })
}

export { getAll, getById, getLimitData, getLatestData, createData }