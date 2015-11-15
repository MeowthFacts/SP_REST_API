module.exports = function(router, Players, Error, Success, Controller)
{
	router.route('/players')
	.get(function(req,res){
				new Players().fetchAll().then(function(userResult) {
          if(userResult != null) {
						userResult = userResult.toJSON()
						console.log("Get Request Made");
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
};
