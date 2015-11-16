module.exports = function(express, knex, Players, World, Queue, PlayerTiles, Controller) {
    'use strict';
    var router = express.Router();

    router.use(function( req, res, next ) {
      var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
      console.log("Request from IP: " + ip);
      //reserved for logs
      next();
    });

    //default router at root of api
    router.get('/', function( req, res ) {
      res.json({message: 'horray! API'});
    });

    //SERVICE ROUTES
    var Error = require('./routes/errors/error.route');
    var Success = require('./routes/success/success.route');


    //FUNCTIONAL ROUTES:
    //API calls for /api/users to add and get all users

    /*********************************************************************************************/
    //Get Player or Players:

    ///players/:player_id
    require('./routes/players/getPlayer.route')(router, Players, World,  Error, Success, Controller);
    ///players
    require('./routes/players/getPlayers.route')(router, Players, World,  Error, Success, Controller);

    /*
    When creating a player, you must add a player to the players table, add the player_id with default values to
    the player_stats table, create a tilemap instance for that player by adding them to the tilemap, randomly
    generate 7 tiles for them, +1 home, +1 randomly generated resouce, +1 random merchant
    */
    require('./routes/players/createPlayer.route')(router, Players, World, Queue, PlayerTiles, Error, Success, Controller);
    /*********************************************************************************************/
    //Player Stats

    //Map Manangement
    require('./routes/world/getWorlds.route')(router, Players, World, Error, Success, Controller);
    //Player tiles
    require('./routes/world/playerTiles.route')(router, Players, World, PlayerTiles, Error, Success, Controller);



    //Coordinates with Maps

    //Queue
    require('./routes/queue/getQueue.route')(router, Queue,  Error, Success, Controller);

    //Reset - Debugging Purposes
    require('./routes/reset/reset.route')(router, knex, Players, World, PlayerTiles, Queue, Error, Success, Controller);


    return router;
};
