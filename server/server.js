var express = require('express')
var morgan = require('morgan')
var Redis = require('ioredis')
var path = require('path')
var uuid = require('uuid/v4')
var bodyParser = require('body-parser')

var app = express()
var redis = Redis(process.env.REDIS_URL || "redis://localhost:6379")

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.resolve(__dirname, "..", 'build')));

app.post('/api/snippets/', function(req, res) {
  var id = uuid();
  var json = req.body.json;
  redis.set(id, json);
  res.json({id: id})
})

app.get('/api/snippets/:id', function(req, res) {
  var id = req.params.id
  redis.get(id)
    .then(function(json) {
      if(!json) {
        //The key isn't in the store
        res.status(404).send("JSON not in store")
      } else {
        res.json({json: json})
      }
    })
})

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
})

app.listen(process.env.PORT)
