var express = require('express')
var morgan = require('morgan')
var Redis = require('ioredis')
var path = require('path')
var uuid = require('uuid/v4')
var bodyParser = require('body-parser')
var axios = require('axios')

var _ = require('lodash');
_.mixin(require('congruence'));

function getGithubRequestConfig(code) {
  var url = 'https://github.com/login/oauth/access_token';
  var data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code
  };
  var config = {
    headers: {'Accept': 'application/json'}
  }
  return [url, data, config]
}

var app = express()
var redis = Redis(process.env.REDIS_URL || "redis://localhost:6379")

const ASTTemplate = {
  type: _.isString,
  begin: _.isNumber,
  end: _.isNumber,
  children: _.isArray
};

const validateAST = function(AST) {
  if (_.isString(AST)) { return true; }
  return _.congruent(ASTTemplate, AST) && (AST.children && AST.children.every(validateAST))
}

const requestTemplate = {
  snippet: _.isString,
  snippetTitle: _.isString,
  annotations: _.isObject,
  AST: validateAST,
  filters: _.isObject,
  readOnly: _.isBoolean
};

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.resolve(__dirname, "..", 'build')));

function saveToRedis(id, req, res) {
  var json = JSON.parse(req.body.json);
  if (_.isObject(json) && _.congruent(requestTemplate, json)) {
    redis.set(id, JSON.stringify(json));
    res.json({id: id});
  } else {
    res.status(400).send('Invalid POST request body');
  }
}

app.post('/api/auth/', function(req, res) {
  //Get the code from a ui
  var code = req.body.code;
  axios.post(...getGithubRequestConfig(code))
    .then(function(response) {
      var data = response.data
      if(data.error) {
        res.status(400).send("The authentication code is invalid")
      } else {
        res.json({token: data.access_token})
      }
    })
    .catch(function(error) {
      res.status(500).send(error)
    })
})

app.post('/api/snippets/', function(req, res) {
  var id = uuid();
  saveToRedis(id, req, res);
})

app.post('/api/snippets/:id', function(req, res) {
  var id = req.params.id;
  // Make sure the ID exists before we save to it
  redis.get(id)
    .then(function(json) {
      if (!json) {
        res.status(404).send(`No snippet exists with the id: "${id}"`);
      } else {
        // The ID exists, go ahead and save
        saveToRedis(id, req, res);
      }
    });
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
