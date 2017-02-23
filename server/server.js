var express = require('express')
var Redis = require('ioredis')
var path = require('path')

var app = express()
var redis = Redis(6379, process.env.REDIS_URL || "localhost")

app.use('/', express.static(path.resolve(__dirname, "..", 'build')));

app.listen(8080)
