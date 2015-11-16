module.exports = function(router, knex, Players, World, PlayerTiles, Queue, Error, Success, Controller)
{
  /**
	* @api {get} /API/reset Reset the Database to Inital State
	* @apiName resetDB
	* @apiGroup Admin
	*
	* @apiDescription This API resets the DB and initalizes 2 players
	*
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*     {
	*        "info" :"Database reset was successful",
  *     }
	*
	*/

  var dbConfigMaster = require('../../config/dbConfigMaster')
  var master = require('knex')(dbConfigMaster);
  var createPlayerController = require('../players/controllers/createPlayer.controller');
  router.route('/reset')
  .get(function(req,res){
    knex('player_tiles').del().then(function(result) {
      knex('world_map').del().then(function(result) {
        knex('players').del().then(function(result) {
          knex('map_queue').del().then(function(result) {
            console.log("Deleted player_tiles, world_map, players, map_queue")
            master.raw('SELECT reset_funct()').then(function(result){
              //CREATING THE INITIAL PLAYER ONE AND PLAYER TWO
              knex('players').insert(
                [
                {player_id: 0, email_id: "NPC0@gmail.com"},
                {player_id: 1, email_id: "NPC1@gmail.com"}
                ]
              ).then(function(result) {
              //PULLING BACK BOTH OF THEIR TILES AND GENERATING THE TILES
                console.log("Updating Map Locations");
                //updated player 0 locations
                knex('world_map')
                .where({player_id: 0}).update({
                  x:0, y:0
                }).then(function(result) {
                  console.log("Player 0 Added");
                });
                //updated player 1 locations
                knex('world_map')
                .where({player_id: 1}).update({
                  x:1, y:0
                }).then(function(result) {
                  console.log("Player 1 Added");
                });
                //Restarting Queue
                knex('map_queue').insert(
                  [{x:1, y:0, direction:0}]
                ).then(function(result) {
                  console.log("Map_Queue Ready")
                });

                knex('player_tiles').where({player_id: 0}).then(function(result) {
                  var tiles = createPlayerController.generateRandomTiles(result);
                  for(var i = 0; i < 9; ++i){
                    knex('player_tiles').where({player_id: tiles[i].player_id, tile_num: tiles[i].tile_num}).update(tiles[i]).then(function(result) {
                    });
                  }
                  console.log("player 0 Tiles Randomzied");
                });

                knex('player_tiles').where({player_id: 1}).then(function(result) {
                  var tiles = createPlayerController.generateRandomTiles(result);
                  for(var i = 0; i < 9; ++i){
                    knex('player_tiles').where({player_id: tiles[i].player_id, tile_num: tiles[i].tile_num}).update(tiles[i]).then(function(result) {
                    });
                  }
                  console.log("player 1 Tiles Randomzied");
                });


              });
            });
            res.send({info: "Database reset was successful"});
          });
        });
      });
    });
  });



};
