module.exports = function(router, Players, World, Error, Success, Controller)
{
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
