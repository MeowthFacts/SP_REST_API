module.exports = function(router, Players, World, Error, Success, Controller)
{
  /**
  * @api {get} /API/players Request all World Information
  * @apiName GetWorld
  * @apiGroup World
  *
  * @apiDescription This API Returns an Array of World Positions and their Owner
  *
  * @apiSuccess {Number} player_id ID of the Player.
  * @apiSuccess {Number} x X of the Player.
  * @apiSuccess {Number} y Y of Player.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [{
  *        "player_id" :"PL0000000",
  *        "x"  :0,
  *        "y"  :0
  *       },
  *       {
  *        "player_id" :"PL0000001",
  *        "x"  :1,
  *        "y"  :0
  *       },...]
  *
  * @apiError WorldNotFound World Addresses were not found.
  *
  */
  router.route('/world')
  .get(function(req,res){
        new World().fetchAll().then(function(worldResult) {
          if(worldResult != null) {
            console.log("Get World Request");
            worldResult = worldResult.toJSON()
            for(var i = 0; i < worldResult.length; ++i) {
              worldResult[i].player_id = "PL" + Controller.pad(worldResult[i].player_id, 7);
            }
            res.send(Success(worldResult));
          }else {
            throw -1;
          }
        }).catch(function(error) {
          res.send(Error(Controller.getError(error)));
        });
  });



};
