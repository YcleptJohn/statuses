const simpleFetch = module.exports = {}
const fetch = require('node-fetch')

const rssParser = require('rss-parser')
const rssParserInstance = new rssParser()


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

simpleFetch.rss = async (url, description) => {
  let fetchedText
  try {
    fetchedText = await simpleFetch._handle(url, description, 'text')
  } catch (e) {
    console.warn(`simpleFetch.rss failed to get/decode data: ${description}`, e)
    fetchedText = null
  }
  if (fetchedText) return rssParserInstance.parseString(fetchedText)
  return null
}