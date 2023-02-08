const Cache = (() => {
  const cacheAtual = {}

  const set = (key, value) => {
    if (!key | !value) return null
    cacheAtual[key.toLowerCase()] = value
  }

  const get = (key) => {
    if (!cacheAtual[key]) return null
    return cacheAtual[key.toLowerCase()]
  }

  const getAll = () => {
    return cacheAtual
  }

  return { set, get, getAll }
})()

export default Cache;