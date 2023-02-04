import Logger from "../logs/logger.mjs"
const { logInfo } = new Logger()

let count = 0

const printHello = (req, res) => {
  count++
  logInfo(`Hello World! ${count}`, 'helloController')
  res.send(`Hello World! ${count}`)
}

export { printHello }