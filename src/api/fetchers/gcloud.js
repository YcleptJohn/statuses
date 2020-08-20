const gcloud = module.exports = {}
const config = require('../../../config')
const transformer = require('../transformers/gcloud.js')
const simpleFetch = require('../../lib/simpleFetch.js')

gcloud._rawFetchIssues = async () => {
  return simpleFetch.json(
    config.gcloud.fetchUrl,
    'gcloud raw issues fetch'
  )
}

gcloud._downDetectorFetch = async () => {
  const url = config.global.downDetectorUrl.replace('%SERVICE_NAME%', config.gcloud.downDetectorIdentifier)
  return simpleFetch.html(
    url,
    'gcloud down detector fetch'
  )
}

gcloud.fetch = async () => {
  const [raw, ddData] = await Promise.allSettled([gcloud._rawFetchIssues(), gcloud._downDetectorFetch()])
  return transformer.v1(raw.value, ddData.value)
}