module.exports = function(router, Players, World, PlayerTiles, Error, Success, Controller)
{
  router.route('/tiles')
  .get(function(req,res){
        new PlayerTiles().fetchAll().then(function(tilesResult) {
          if(tilesResult != null) {
            tilesResult = tilesResult.toJSON()
            res.send(Success(tilesResult));
          }else {
            throw -1;
          }
        }).catch(function(error) {
          res.send(Error(Controller.getError(error)));
        });
  });

  router.route('/tiles/:player_id')
  .get(function(req,res){
    var player_id = req.params.player_id;
    new PlayerTiles().where({"player_id": player_id}).fetchAll().then(function(tilesResult) {
      if(tilesResult != null) {
        tilesResult = tilesResult.toJSON()
        res.send(Success(tilesResult));
      }else {
        throw -1;
      }
    }).catch(function(error) {
      res.send(Error(Controller.getError(error)));
    });
  });

  router.route('/tiles/:player_id/:tile_num')
  .get(function(req,res){
    var player_id = req.params.player_id;
    var tile_num = req.params.tile_num;
    new PlayerTiles({"player_id": player_id, "tile_num": tile_num}).fetch().then(function(tilesResult) {
      if(tilesResult != null) {
        tilesResult = tilesResult.toJSON()
        res.send(Success(tilesResult));
      }else {
        throw -1;
      }
    }).catch(function(error) {
      res.send(Error(Controller.getError(error)));
    });
  });

};
