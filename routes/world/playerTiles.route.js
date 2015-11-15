module.exports = function(router, Players, World, PlayerTiles, Error, Success, Controller)
{
  router.route('/tiles')
  .get(function(req,res){
        new PlayerTiles().fetchAll().then(function(tilesResult) {
          if(tilesResult != null) {
            //userResult = userResult.toJSON()
            //console.log("Get Request Made with ID: " + player_id);
            //userResult.player_id = "PL" + Controller.pad(userResult.player_id, 7);
            res.send(Success(tilesResult));
          }else {
            throw -1;
          }
        }).catch(function(error) {
          res.send(Error(Controller.getError(error)));
        });
  });



};
