const x = require('./fetchers')

;(async () => {
  console.log('Running...')
  await x.azure.fetch()
})()