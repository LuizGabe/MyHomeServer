import Logger from "../logs/logger.mjs"

let count = 0

const prinHello = (req, res) => {
  Logger.logInfo('hello', __filename)
  res.statusCode = 200
  res.send(`Hello World! ${count++}`)
}

export { prinHello }