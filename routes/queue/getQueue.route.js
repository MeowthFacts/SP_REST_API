module.exports = function(router, Queue, Error, Success, Controller)
{
  /**
	* @api {get} /API/queue Request Complete Queue
	* @apiName GetQueue
	* @apiGroup Queue
	*
	* @apiDescription This API Returns the Mapping Queue
	*
	* @apiSuccess {Number} queue ID of the Queue.
	* @apiSuccess {Number} x X Posotion for the next Player.
	* @apiSuccess {Number} y Y Posotion for the next Player.
	* @apiSuccess {Number} direction Number that signifies direction [0...4].
	* @apiSuccess {Date} modified Date when last modified(managed by DB).
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*     [{
	*        "queue"     :2,
	*        "x"         :0,
  *        "y"         :0,
  *        "direction" :0,
  *        "modified"  :"2015-11-16T09:29:10.914Z"
	*       },...]
	*
	* @apiError QueueNotInitialized Queue was not found.
	*/
  router.route('/queue')
  .get(function(req,res){
        new Queue().fetchAll().then(function(userResult) {
          if(userResult != null) {
            userResult = userResult.toJSON()
            res.send(Success(userResult));
          }else {
            throw -1;
          }
        }).catch(function(error) {
          res.send(Error(Controller.getError(error)));
        });
  });

};
