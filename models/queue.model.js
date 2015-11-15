//Creating a Model for the User Table
module.exports = function(bookshelf)
{
	return bookshelf.Model.extend({
		tableName:'map_queue',
		idAttribute: 'queue'
	});
};
