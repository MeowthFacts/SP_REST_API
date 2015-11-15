//Creating a Model for the Player Table
module.exports = function(bookshelf, Player)
{
	return bookshelf.Model.extend({
		tableName:'world_map',
		idAttribute: null,
    player: function() {
      return this.belongsTo(Player, ["player_id"]);
    }
	});
};
