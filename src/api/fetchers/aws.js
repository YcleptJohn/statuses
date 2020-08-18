const aws = module.exports = {}
const config = require('../../../config')
const transformer = require('../transformers/aws.js')
const tiny = require('tiny-json-http')

aws._rawFetchIssues = async () => {
  console.log(config.aws.fetchUrl)
  return tiny.get({ url: config.aws.fetchUrl })
}

aws._downDetectorFetch = async () => {
  const url = config.global.downDetectorUrl.replace('%SERVICE_NAME%', config.aws.downDetectorIdentifier)
  return tiny.get({ url })
}

aws.fetch = async () => {
  console.log('aws fetching')
  let r
  try {
    r = await aws._rawFetchIssues()
  } catch (e) {
    console.log('???', e)
  }
  console.log(r && r.body || '...')
}