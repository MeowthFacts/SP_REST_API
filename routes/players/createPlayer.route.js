module.exports = function(router, Players, World, Queue, Error, Success, Controller)
{


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
              nextQueue = Controller.nextMapPosition(queue.x, queue.y, queue.direction);
              new Queue().save(nextQueue,{method:"insert"}).then(function(result) {
                }).catch(function(error) {
                  res.send(Error(Controller.getError(error)));
              });
              //Update the player with correct coordinates
              new World().where({"player_id":player_id}).save({"x":nextQueue.x, "y":nextQueue.y},{method:"update"})
      				.then(function(result) {
                console.log("Updated World Coordinates for player: " + player_created.player_id);
      				}).catch(function(error) {
                res.send(Error(Controller.getError(error)));
      				});

              res.send(Success(player_created));
            }else {
              //No Queue found - This shouldn't happen technically
              //Deleting Bad Player add
              new Players().where({"player_id":player_id}).destroy();
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
