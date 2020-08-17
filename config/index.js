module.exports = require('require-all')({
  dirname: __dirname + '/',
  filter: (fileName) => fileName.replace('index.js', '').slice(0, -3)
})