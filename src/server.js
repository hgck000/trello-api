const express = require('express')

const app = express()

const hostname = 'localhost'
const port = 8017

app.get('/', function (req, res) {
  res.send('Hello word')
})

app.listen(port, hostname, () => {
  console.log(`hello QuangMinh, I'm running server at ${hostname}:${port}/`)
})