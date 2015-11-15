module.exports = function(router, Players, Error, Success, Controller)
{
  router.route('/players/:player_id')
  .get(function(req,res){
        console.log(req.params);
        var player_id = parseInt(req.params.player_id.substr(2));
        new Players({"player_id": player_id}).fetch().then(function(userResult) {
          if(userResult != null) {
            userResult = userResult.toJSON
            ()
            console.log("Get Request Made with ID: " + player_id);
            console.log(Controller.pad(0, 4));
            userResult.player_id = "PL" + Controller.pad(userResult.player_id, 7);
            res.send(Success(userResult));
          }else {
            throw -1;
          }
        }).catch(function(error) {
          res.send(Error(Controller.getError(error)));
        });
  });



};
