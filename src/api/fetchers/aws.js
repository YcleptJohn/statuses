const aws = module.exports = {}
const config = require('../../../config')
const transformer = require('../transformers/aws.js')
const simpleFetch = require('../../lib/simpleFetch.js')

aws._rawFetchIssues = async () => {
  return simpleFetch.json(
    config.aws.fetchUrl,
    'aws raw issues fetch'
  )
}

aws._downDetectorFetch = async () => {
  const url = config.global.downDetectorUrl.replace('%SERVICE_NAME%', config.aws.downDetectorIdentifier)
  return simpleFetch.html(
    url,
    'aws down detector fetch'
  )
}

aws.fetch = async () => {
  const [r1, r2] = await Promise.allSettled([aws._rawFetchIssues(), aws._downDetectorFetch()])
  console.log('r1', r1)
  console.log('r2', r2)
}