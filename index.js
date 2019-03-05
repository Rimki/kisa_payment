var express = require('express');
var app = express();
var request= require('request');
var path =require('path');
var parser =require("xml2js");

console.log(path.join(__dirname,'views'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

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