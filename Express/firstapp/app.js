const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('Received a request for the homepage at ' + new Date().toISOString())
  res.end('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
