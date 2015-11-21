module.exports = function(router, Players, World, Error, Success, Controller)
{
	/**
	* @api {get} /API/players Request all Players
	* @apiName GetPlayers
	* @apiGroup Players
	*
	* @apiDescription This API Returns an Array of Players
	*
	* @apiSuccess {Number} player_id ID of the Player.
	* @apiSuccess {String} email_id Email of the Player.
	* @apiSuccess {Boolean} success Success of api.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*     [{
	*        "player_id" :"PL0000000",
	*        "email_id"  :"NPC0@gmail.com"
	*        "username"  :"NPC0",
	*        "role"      :"1",
	*       },
	*				{
	*        "player_id" :"PL0000001",
	*        "email_id"  :"NPC1@gmail.com"
	*        "username"  :"NPC1",
	*        "role"      :"1",
	*        },...]
	*
	* @apiError PlayerNotFound Players were not found.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 404 Not Found
	*     {
	*       "error_code" : -1,
	*        "info"      :"No players found",
	*       "success"    :false
	*     }
	*/
	router.route('/players')
	.get(function(req,res){
				new Players().fetchAll().then(function(userResult) {
          if(userResult != null) {
						userResult = userResult.toJSON()
						console.log("Get Request Made for Players");
						for(var i = 0; i < userResult.length; ++i) {
							userResult[i].player_id = "PL" + Controller.pad(userResult[i].player_id, 7);
						}
            res.send(Success(userResult));
          }else {
            throw "{ Null Result }"
          }
				}).catch(function(error) {
					res.send(Error(Controller.getError(error)));

				});
		});

		/**
		* @api {get} /API/players/world Request all Players with World Information
		* @apiName GetPlayersWorld
		* @apiGroup Players
		*
		* @apiDescription This API Returns an Array of Players
		*
		* @apiSuccess {Number} player_id ID of the Player.
		* @apiSuccess {String} email_id Email of the Player.
	  * @apiSuccess {JSON} world World Coordinates of Player.
		*
		* @apiSuccessExample Success-Response:
		*     HTTP/1.1 200 OK
		*     [{
		*        "player_id" :"PL0000000",
		*        "email_id"  :"NPC0@gmail.com"
		*        "username"  :"NPC0",
		*        "role"      :"1",
		*     	 "world": {
		*           "player_id": 1,
		*           "x":0,
		*            "y":0
		*        }},
		*				{
		*        "player_id" :"PL0000001",
		*        "email_id"  :"NPC1@gmail.com"
		*        "username"  :"NPC1",
		*        "role"      :"1",
		*     	 "world": {
		*           "player_id": 2,
		*           "x":1,
		*           "y":0
		*        }}...]
		*
		* @apiError PlayerNotFound Players were not found.
		*
		* @apiErrorExample Error-Response:
		*     HTTP/1.1 404 Not Found
		*     {
		*       "error_code" : -1,
		*        "info"      :"No players found",
		*       "success"    :false
		*     }
		*/
		router.route('/players/world')
		.get(function(req,res){
					new Players().fetchAll({withRelated: ["world"]}).then(function(userResult) {
						if(userResult != null) {
							userResult = userResult.toJSON()
							console.log("Get Request Made for Players with Worlds");
							for(var i = 0; i < userResult.length; ++i) {
								delete userResult[i].world["player_id"];
								userResult[i].player_id = "PL" + Controller.pad(userResult[i].player_id, 7);
							}
							res.send(Success(userResult));
						}else {
							throw "{ Null Result }"
						}
					}).catch(function(error) {
						res.send(Error(Controller.getError(error)));

					});
			});
			/**
		  * @api {get} /API/players/tiles Request all Players Tile Information
		  * @apiName GetPlayersTiles
		  * @apiGroup Players
		  *
			* @apiDescription This API Returns an Array of Players with all of their tiles
			*
		  * @apiSuccess {Number} player_id ID of the Player.
		  * @apiSuccess {String} email_id Email of the Player.
		  * @apiSuccess {Array} tiles Array tiles that belong to the Player.
		  * Tiles Array is made up of JSON's of Tile Objects
		  * @apiSuccess {Boolean} success Success of api.
		  *
		  * @apiSuccessExample Success-Response:
		  *     HTTP/1.1 200 OK
		  *     [{
		  *        "player_id" :"PL0000001",
		  *        "email_id"  :"NPC1@gmail.com",
			*        "username"  :"NPC1",
			*        "role"      :"1",
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
		  *     },...]
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
			router.route('/players/tiles')
			.get(function(req,res){
						new Players().fetchAll({withRelated: ["tiles"]}).then(function(userResult) {
							if(userResult != null) {
								userResult = userResult.toJSON()
								console.log("Get Request Made for Players with Worlds");
								for(var i = 0; i < userResult.length; ++i) {
									delete userResult[i].tiles["player_id"];
									userResult[i].player_id = "PL" + Controller.pad(userResult[i].player_id, 7);
								}
								res.send(Success(userResult));
							}else {
								throw "{ Null Result }"
							}
						}).catch(function(error) {
							res.send(Error(Controller.getError(error)));

						});
				});
	/**
  * @api {get} /API/players/world/tiles Request all Players World and Tile Information
  * @apiName GetPlayersWorldTiles
  * @apiGroup Players
  *
	* @apiDescription This API Returns an Array of Players with all of their world and tiles
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
  *     [{
  *        "player_id" :"PL0000001",
  *        "email_id"  :"NPC1@gmail.com",
	*        "username"  :"NPC1",
	*        "role"      :"1",
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
  *     },...]
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
		router.route('/players/world/tiles')
		.get(function(req,res){
					new Players().fetchAll({withRelated: ["world", "tiles"]}).then(function(userResult) {
						if(userResult != null) {
							userResult = userResult.toJSON()
							console.log("Get Request Made for Players with Worlds");
							for(var i = 0; i < userResult.length; ++i) {
								delete userResult[i].world["player_id"];
								delete userResult[i].tiles["player_id"];
								userResult[i].player_id = "PL" + Controller.pad(userResult[i].player_id, 7);
							}
							res.send(Success(userResult));
						}else {
							throw "{ Null Result }"
						}
					}).catch(function(error) {
						res.send(Error(Controller.getError(error)));

					});
			});
};
