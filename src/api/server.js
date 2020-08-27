const express = require('express')
const path = require('path') 

const router = express()

router.listen(9999, () => {
  console.log('listening')
})