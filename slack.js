var http = require('http');
var convert = require('xml-js');
var parser = require('xml2js');
var request = require('request');
var express = require('express');

var app =express();

var option = {
    'hostname': 'www.weather.go.kr',
    'path': '/weather/forecast/mid-term-rss3.jsp?stnld=109'
}

function weather(callback) {
    request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
        parser.parseString(body, function (err, jsonData) {
            console.log(body);
            console.log(jsonData);
            callback(jsonData.rss.channel[0].item[0].description[0].header[0].wf[0]);
        })
    });
}

app.get('/weather',function(req,res){
    weather(function(data){
        res.send(data);
    })
});

app.listen(3000);