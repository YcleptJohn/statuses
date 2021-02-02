const cache = module.exports = {}

const { promisify } = require('util')
const redis = require('redis')
const client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true})

const funcs = ['get', 'set', 'del', 'expire']
const promiseClient = Object.fromEntries(
  funcs.map(func => {
    return [func, promisify(client[func]).bind(client)]
  })
)

cache.set = async (key, value) => {
  if (typeof value === 'object') value = JSON.stringify(value)
  return promiseClient.set(key, value, 'EX', 60);
}

cache.get = async (key) => {
  const value = await promiseClient.get(key)
  let objValue, isObject
  try {
    objValue = JSON.parse(value)
    if (!objValue || typeof objValue !== 'object') throw new Error('Non-json string')
    isObject = true
  } catch (_e) {
    isObject = false
  }
  return isObject ? objValue : value
}

cache.del = async (key) => {
  return promiseClient.del(key)
}

cache.resetExpiry = async(key) => {
  return promiseClient.expire(key, 60)
}