//Creating a Model for the Player Table
module.exports = function(bookshelf, World)
{
	return bookshelf.Model.extend({
		tableName:'players',
		idAttribute: 'player_id',
		world: function() {
			var World = require('./world.model.js')(bookshelf, this);
	 		return this.hasOne(World, ['player_id']);
		},
		tiles: function() {
			var Tiles = require('./playerTiles.model.js')(bookshelf, this);
			return this.hasMany(Tiles, ['player_id']);
		}
	});
};
