const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials('views/partials')
app.set('view engine', hbs)

app.use((req, res, next) => {
  const now = Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', err => err && console.log(err))
  next()
})

// app.use((req, res) => res.render('maintenance.hbs'))

app.use(express.static('public'))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

app.get('/', (req, res) => {
  res.render('home.hbs', {
    welcomeMessage: 'Hey there, welcome!',
    currentYear: 2016
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    currentYear: 2017
  })
})

app.get('/bad', (req, res) => {
  res.send({
    message: 'Invalid url'
  })
})

app.listen(3000, () => console.log('Server running on port 3000'))