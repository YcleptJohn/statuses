const azure = module.exports = {}
const config = require('../../../config')
const simpleFetch = require('../../lib/simpleFetch.js')

azure._rawFetchIssues = async () => {
  return simpleFetch.rss(
    config.azure.fetchUrl,
    'azure raw issues fetch'
  )
}

azure._downDetectorFetch = async () => {
  const url = config.global.downDetectorUrl.replace('%SERVICE_NAME%', config.azure.downDetectorIdentifier)
  return simpleFetch.html(
    url,
    'azure down detector fetch'
  )
}

azure.fetch = async () => {
  const r = await azure._rawFetchIssues()
  console.log(r)
}