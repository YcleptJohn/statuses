const x = require('./fetchers')

;(async () => {
  console.log('Running...')
  const r = await x.gcloud.fetch()
  console.log(r)
})()