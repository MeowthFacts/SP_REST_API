var express = require('express');
var pg = require('pg');
var server = module.exports = express();
var http = require('http').Server(server);
var path = require('path');
var bodyParser = require('body-parser')
var dbConfig = require('./config/dbConfig')
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);server.set('bookshelf', bookshelf);
var Controller = require('./global_controller');

//Creating a Model for the Player Table
var Players = require('./models/player.model.js')(bookshelf);
var Queue = require('./models/queue.model.js')(bookshelf);
var World = require('./models/world.model.js')(bookshelf, Players);
var PlayerTiles = require('./models/playerTiles.model.js')(bookshelf, Players);




server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());

//ROUTING INFORMATION:
var port = 3000;
//including routes
var router = require('./routes')(express, knex, Players, World, Queue, PlayerTiles, Controller);
server.use('/api', router);

//enable the api docs to be browsed via address:3000/doc
server.use('/doc', express.static(__dirname + '/doc'));

http.listen(port, function() {
  console.log('API listening on *:' + port);
})
