module.exports = function(express, Players, Queue, Controller) {
    'use strict';
    var router = express.Router();

    router.use(function( req, res, next ) {
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
    require('./routes/players/getPlayer.route')(router, Players,  Error, Success, Controller);
    ///players
    require('./routes/players/getPlayers.route')(router, Players,  Error, Success, Controller);

    /*
    When creating a player, you must add a player to the players table, add the player_id with default values to
    the player_stats table, create a tilemap instance for that player by adding them to the tilemap, randomly
    generate 7 tiles for them, +1 home, +1 randomly generated resouce, +1 random merchant
    */
    require('./routes/players/createPlayer.route')(router, Players, Queue, Error, Success, Controller);
    /*********************************************************************************************/
    //Player Stats

    //Map Manangement
    //Coordinates with Maps

    //Queue
    ///players/:player_id
    require('./routes/queue/getQueue.route')(router, Queue,  Error, Success, Controller);


    return router;
};
