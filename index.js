const express = require('express')
const bodyParser = require('body-parser')
const { config } = require('./config')
const cors = require('cors')

const mailApi = require('./routes/send')

const app = express()
const port = config.port || 3002

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

// Routes

app.get('/', (req, res) => {
  res.send('Welcome to my api')
})

app.get('*', (req, res, next) => {
  next()
})

mailApi(app)

app.use(function (req, res, next) {
  const err = new Error('Requested URL Not Found!')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message

  // render the error page
  res.status(err.status || 500)
  res.send({
    error: {
      message: res.locals.message
    }
  })
})

const server = app.listen(port, () => {
  console.log(`Listening http://localhost:${server.address().port}`)
})
