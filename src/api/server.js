const express = require('express')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
const secure = require('express-force-https')
const cache = require('./lib/cache')

const router = express()

router.use(
  helmet({
    contentSecurityPolicy: false
  })
)
router.use(cors())
router.use(secure)
router.use(express.static(path.resolve(__dirname, '..', '..', 'build')))
router.use(express.json())

router.route('/api/*')
  .get((req, res, next) => {
    if (req.query.token !== process.env.API_TOKEN) return res.sendStatus(403)
    next()
  })
  .post((req, res, next) => {
    if (req.body.token !== process.env.API_TOKEN) return res.sendStatus(403)
    next()
  })

router.get('/api/fetch/:key', async (req, res) => {
  if (!req.params || !req.params.key) return res.status(400).send({ error: 'No fetcher parameter' })
  const key = req.params.key
  const cachedResult = await cache.get(key)
  if (cachedResult) {
    cache.resetExpiry(key)
    return res.send(cachedResult)
  }

  let fetcher 
  try {
    fetcher = require(`./fetchers/${key}`)
  } catch (e) {
    console.error('Failed to find fetcher', key)
  }
  if (!fetcher) return res.status(404).send({ error: `No fetcher found for param: ${key}` })

  let result
  try {
    result = await fetcher.fetch()
  } catch (e) {
    console.error('Failed to fetch any data', e)
    // todo: probably throw/handle the error better
  }

  if (result) {
    cache.set(key, result)
  }

  return res.send(result)
})

// If no api route matches, just give the website
router.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'))
})

router.listen(process.env.PORT || 9999, () => {
  console.log(`Listening on port ${process.env.PORT || 9999}`)
})