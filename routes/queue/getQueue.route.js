module.exports = function(router, Queue, Error, Success, Controller)
{
  router.route('/queue')
  .get(function(req,res){
        console.log(req.params);
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
