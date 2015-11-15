module.exports = function(router, Players, Queue, Error, Success, Controller)
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
          console.log(player_created);
          //Player Created, now give them a map position
          new Queue().query('orderBy', 'modified', 'desc').fetch().then(function(queue) {
            if(queue !== null){
              queue = queue.toJSON();
              console.log(queue);
              //pulled next location off Queue, deleting it.
              new Queue().where({"queue":queue.queue}).destroy().then(function(queue) {
                }).catch(function(error) {
                    res.send(Error(Controller.getError(error)));
            		});

                //console.log( nothing failed);
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
