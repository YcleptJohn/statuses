const simpleFetch = module.exports = {}
const fetch = require('node-fetch')

simpleFetch._handle = async (url, description, bodyFunction) => {
  if (!url) {
    console.warn('simpleFetch.json had no url', url)
    return null
  }
  let fetchResult
  try {
    fetchResult = await fetch(url)
    fetchResult = await fetchResult[bodyFunction]()
  } catch (e) {
    console.warn(`simpleFetch.json failed to get/decode data: ${description}`, e)
    fetchResult = null
  }
  return fetchResult
}

simpleFetch.json = async (url, description) => {
  return simpleFetch._handle(url, description, 'json')
}

simpleFetch.html = async (url, description) => {
  return simpleFetch._handle(url, description, 'text')
}