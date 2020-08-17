const gcloud = module.exports = {}
const config = require('../config/gcloud.js')
const transformer = require('../transformers/gcloud.js')
const tiny = require('tiny-json-http')

gcloud._rawFetchIssues = async () => {
  return tiny.get({ url: config.fetchUrl })
}

gcloud._tweetVolumeFetch = async () => {}
gcloud._downDetectorFetch = async () => {}

gcloud.fetch = async () => {
  // Check cache for a transformed object, return it if found
  // Otherwise fetch+transform, cache(1min ttl) and return
  console.log((await gcloud._rawFetchIssues()).body)
}