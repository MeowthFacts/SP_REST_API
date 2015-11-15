//Creating a Model for the Player Table
module.exports = function(bookshelf)
{
	return bookshelf.Model.extend({
		tableName:'players',
		idAttribute: 'player_id'
	});
};
