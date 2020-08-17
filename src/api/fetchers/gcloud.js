const gcloud = module.exports = {}
const config = require('../../../config')
const transformer = require('../transformers/gcloud.js')
const tiny = require('tiny-json-http')

gcloud._rawFetchIssues = async () => {
  return tiny.get({ url: config.fetchUrl })
}

// Temporarily suspending tweet volume fetching -
// looks as thought it would require a long-term event streaming INF to monitor rates
// so will consider just embedding a recent tweet window into appropriate locations..
// probable if people check a specific service instead of the overview
gcloud._tweetVolumeFetch = async () => {}
gcloud._downDetectorFetch = async () => {
  const url = config.global.downDetectorUrl.replace('%SERVICE_NAME%', config.gcloud.downDetectorIdentifier)
  return tiny.get({ url })
  /*
  console.log('No problems', r.body.includes('No problems at'))
  console.log('Possible problems', r.body.includes('Possible problems at'))
  console.log('Definite problems', r.body.includes('Problems at') && !r.body.includes('No problems at') && !r.body.includes('Possible problems at'))
  DO NOT USE, BUT TINY EXAMPLE OF HOW WE CAN RIP THIS INFO OUT OF THE HTML TO AVOID PAYING £1000 for an API
  */
}

gcloud.fetch = async () => {
  // Check cache for a transformed object, return it if found
  // Otherwise fetch+transform, cache(1min ttl) and return
  // console.log((await gcloud._rawFetchIssues()).body)
  const r = await gcloud._downDetectorFetch()
  console.log(r.body)
}