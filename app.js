const express = require('express')
const morgan = require('morgan') // https://www.npmjs.com/package/morgan
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config() // https://www.npmjs.com/package/dotenv
const users = require('./routes/users')

const app = express()

// connect to database
const uri = process.env.MLAB_URI
mongoose.connect(uri, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

// ================================================
// Middleware
// ================================================
app.use(morgan('dev'))
app.use(bodyParser.json())

// ================================================
// Routes
// ================================================
app.get('/', (req, res) => res.send('Welcome to Couponator API!'))
app.use('/users', users)

// ================================================
// Errors handler
// ================================================
app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  const error = process.env === 'development' ? err : {}
  const status = err.status || 500

  // respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  })

  // respont to ourselfves
  console.error(err)
})

// start the server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`App listening on port ${port}!`))
