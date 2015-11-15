module.exports = function(router, Players, World, Error, Success, Controller)
{
  router.route('/world')
  .get(function(req,res){
        new World().fetchAll({withRelated: ['player']}).then(function(userResult) {
          if(userResult != null) {
            console.log("Get World Request");
            userResult = userResult.toJSON()
            for(var i = 0; i < userResult.length; ++i) {
              delete userResult[i].player["player_id"];
              userResult[i].player_id = "PL" + Controller.pad(userResult[i].player_id, 7);
            }
            res.send(Success(userResult));
          }else {
            throw -1;
          }
        }).catch(function(error) {
          res.send(Error(Controller.getError(error)));
        });
  });



};
