const x = require('./fetchers')
const a = require('.././api/examples/aws-maybe-json?.json')

;(async () => {
  console.log('Running...')
  const r = await x.gcloud.fetch()
  console.log(JSON.stringify(r, null, 2))
  // const allServiceNames = [...new Set(a.archive.map(x => x.service))]
  // console.log(JSON.stringify(allServiceNames, null, 2))
})()