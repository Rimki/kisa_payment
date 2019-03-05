var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.send('root')
})

app.get('/home', function (req, res) {
    res.send('home')
  })

  app.get('/about', function (req, res) {
    res.send('about')
  })
  
 
app.listen(3000)