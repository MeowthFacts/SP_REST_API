module.exports = function(router, Players, World, Error, Success, Controller)
{
 /**
 * @api {get} /API/players/id/:player_id Request Player information
 * @apiName GetPlayerByID
 * @apiGroup Players
 *
 * @apiParam {Number} player_id Players unique ID.
 *
 * @apiSuccess {Number} player_id ID of the Player.
 * @apiSuccess {String} email_id Email of the Player.
 * @apiSuccess {Boolean} success Success of api.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "player_id" :"PL0000001",
 *        "email_id"  :"NPC1@gmail.com",
 *        "username"  :"NPC1",
 *        "role"      :"1",
 *        "success"   :true
 *     }
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
  router.route('/players/id/:player_id')
  .get(function(req,res){
        console.log("Get request made for ID:" + req.params.player_id);
        //ALLOWS API USAGE FOR PL00000X or X
        var player_id = req.params.player_id;
        if(req.params.player_id[0] === 'P') {
          var player_id = parseInt(req.params.player_id.substr(2));
        }
        new Players({"player_id": player_id}).fetch().then(function(userResult) {
          if(userResult != null) {
            userResult = userResult.toJSON()
            userResult.player_id = "PL" + Controller.pad(userResult.player_id, 7);
            res.send(Success(userResult));
          }else {
            throw -1;
          }
        }).catch(function(error) {
          res.send(Error(Controller.getError(error)));
        });
  });

  /**
  * @api {get} /API/players/id/:player_id/world/tiles Request Player's World and Tile Information
  * @apiName GetPlayerWorldTileByID
  * @apiGroup Players
  *
  * @apiParam {Number} player_id Players unique ID.
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
  *     {
  *        "player_id" :"PL0000001",
  *        "email_id"  :"NPC1@gmail.com",
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
  *     }
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

  router.route('/players/id/:player_id/world/tiles')
  .get(function(req,res){
        console.log("Get request made for ID:" + req.params.player_id);
        //ALLOWS API USAGE FOR PL00000X or X
        var player_id = req.params.player_id;
        if(req.params.player_id[0] === 'P') {
          var player_id = parseInt(req.params.player_id.substr(2));
        }
        new Players({"player_id": player_id}).fetch({withRelated: ["world", "tiles"]}).then(function(userResult) {
          if(userResult != null) {
            userResult = userResult.toJSON()
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
