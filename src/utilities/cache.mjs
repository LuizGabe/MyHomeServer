import Logger from "../logs/logger.mjs"
const { logError } = new Logger()

const path = 'utilities/cache'

const Cache = (() => {
  const cacheAtual = {}

  const set = (key, value) => {
    if (!key | !value) logError('key or value is null', path)
    cacheAtual[key.toLowerCase()] = value
  }

  const get = (key) => {
    if (!cacheAtual[key]) logError('key not found', path)
    return cacheAtual[key.toLowerCase()] || null
  }

  return { set, get }
})()

export default Cache;