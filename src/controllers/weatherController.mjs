import weatherOperation from "../models/weather/operation.mjs";
import Logger from "../logs/logger.mjs";
import { isValidMacAddress } from "../utilities/regexTester.mjs";
import Cache from  "../utilities/cache.mjs";
import deviceOperation from "../models/device/operation.mjs";

const Weather = weatherOperation()
const Device = deviceOperation()

const path = 'weatherController'

const { logError, logSuccess, logInfo, logWarning, logDescribe } = new Logger();

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
      if (Cache.get('device') != null) {
        deviceData = Cache.get('device').find((device) => device.macAddress === macAddress)
      } else {
        const data = await Device.all()
        Cache.set('device', data)
        deviceData = data.find((device) => device.macAddress === macAddress)
      }
      if (deviceData) {
        save(jsonData, deviceData.id)
      } else {
        const newDevice = await Device.create({ macAddress })
        newDevice.dataValues.id = newDevice.null
        Cache.get('device').push(newDevice)
        save(jsonData, newDevice.id)
      }
    } else {
      res.status(404).send('Add MacAddress in Header and try again')
    }
    
    function save(jsonData, id) {
      let resposta = {
        id:id,...jsonData
      }
      logDescribe('Resposta', resposta)
      console.timeEnd('createData')
      res.status(200).json(resposta)
    }
    // function save (jsonData, id) {
    //   jsonData.deviceId = id
    //   jsonData.dateHour = new Date(new Date().setUTCHours(new Date().getUTCHours() - 3)).toISOString()

    //   Weather.create(jsonData).then(data => {
    //     if(data.id != null) {
    //       res.status(200).json(data)
    //       console.timeEnd('createData')
    //     } else {
    //       Weather.latest().then(data => {
    //         res.status(200).json(data)
    //         console.timeEnd('createData')
    //       })
    //     }
        
    //   })
    // }

  })
}

export { getAll, getById, getLimitData, getLatestData, createData }