//Creating a Model for the Player Table
module.exports = function(bookshelf, Player)
{
	return bookshelf.Model.extend({
		tableName:'player_tiles',
		idAttribute: ['player_id', 'tile_num'],
		player: function() {
	 		return this.belongsTo(Player, ['player_id']);
		}
	});
};
