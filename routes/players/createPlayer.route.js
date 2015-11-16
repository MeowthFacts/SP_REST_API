module.exports = function(router, Players, World, Queue, PlayerTiles, Error, Success, Controller)
{
  /**
  * @api {post} /API/players Create a Player
  * @apiName createPlayer
  * @apiGroup Players
  *
  * @apiParam {String} email_id Players unique Email ID.
  *
  * @apiDescription This API Creates a Player and returns all of it's Data Structures
  *
  * @apiSuccess {Number} player_id ID of the Player.
  * @apiSuccess {String} email_id Email of the Player.
  * @apiSuccess {JSON} world World Coordinates of Player.
  * @apiSuccess {Array} tiles Array tiles that belong to the Player.
  * Tiles Array is made up of JSON's of Tile Objects
  * @apiSuccess {Boolean} success Success of api.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *        "player_id" :"PL0000001",
  *        "email_id"  :"NPC1@gmail.com",
  *        "world": {
  *           "player_id": 1,
  *           "x":0,
  *            "y":0
  *        }
  *        "tiles": [{
  *           "player_id": 1,
  *           "tile_id": 2005,
  *           "is_res": null,
  *           "is_home": null,
  *           "is_merch": null,
  *           "tile_num": 0,
  *           "merch_id": null,
  *           "res_id": null
  *        },
  *        {
  *           "player_id": 1,
  *           "tile_id": 4000,
  *           "is_res": null,
  *           "is_home": null,
  *           "is_merch": null,
  *           "tile_num": 1,
  *           "merch_id": null,
  *           "res_id": null
  *        },...]
  *        "success"   :true
  *     }
  *
  * @apiError PlayerNotFound The player_id of the Player was not found.
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "error_code" : -1,
  *        "info"      :"No player found with that player_id",
  *       "success"    :false
  *     }
  */
      var createPlayerController = require('./controllers/createPlayer.controller');
  		//Creating a new player
      router.route('/players')
    	.post(function(req,res) {
  			if(req.body === undefined) {
  				res.json({missing_parameter:"REQUEST",success:false});
  				return;
  			}
    		if(req.body.email === undefined) {
  				console.log("Email UNDEFINED");
    			res.json({missing_parameter:"email",success:false});
    			return;
    		}
    		var data = ({
          "email_id":req.body.email
    		});
    		new Players().save(data,{method:"insert"}).then(function(result) {
    			var player_created = result.toJSON();
    			var player_id = player_created["player_id"];
          player_created["player_id"] = "PL" + Controller.pad(player_id, 7);

          //Player Created, now give them a map position
          new Queue().query('orderBy', 'modified', 'desc').fetch().then(function(queue) {
            if(queue !== null){
              queue = queue.toJSON();
              //pulled next location off Queue, deleting it.
              new Queue().where({"queue":queue.queue}).destroy().then(function(destroyed) {
                }).catch(function(error) {
                    res.send(Error(Controller.getError(error)));
            		});

              //Update the queue
              nextQueue = createPlayerController.nextMapPosition(queue.x, queue.y, queue.direction);
              new Queue().save(nextQueue,{method:"insert"}).then(function(result) {
                }).catch(function(error) {
                  res.send(Error(Controller.getError(error)));
              });

              //Update the player with correct coordinates
              new World().where({"player_id":player_id}).save({"x":nextQueue.x, "y":nextQueue.y},{method:"update"})
      				.then(function(result) {
                console.log("Updated World Coordinates for player: " + player_created.player_id);
                player_created.world = result.toJSON();
                player_created.world.player_id = player_id;
                console.log(player_created);
      				}).catch(function(error) {
                res.send(Error(Controller.getError(error)));
      				});
              new Players({"player_id": player_id}).fetch({withRelated: ["world", "tiles"]}).then(function(userResult) {
                userResult = userResult.toJSON();
                var tiles = createPlayerController.generateRandomTiles(userResult.tiles);
                console.log("Generated Random Tiles for Player: " + player_created.player_id);
                for(var i = 0; i < 9; ++i) {
                  new PlayerTiles().where({"player_id": tiles[i].player_id, "tile_num": tiles[i].tile_num}).save(tiles[i],{method:"update"}).then(function(result) {
                  }).catch(function(error) {
                    console.log(error);
          				});
                }
                //add tiles to player object:
                player_created.tiles = tiles;
                res.send(Success(player_created));

              }).catch(function(error) {
                res.send(Error(Controller.getError(1)));
              });
            }else {
              //No Queue found - This shouldn't happen technically
              //Delete Bad Player add
              throw 12;
            }
          }).catch(function(error) {
              res.send(Error(Controller.getError(error)));
          });
    		}).catch(function(error) {
            res.send(Error(Controller.getError(error)));
    		});
    	});
};
