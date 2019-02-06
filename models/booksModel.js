var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = new Schema({
	'name': String,
	'year': Number,
	'shortDescription': String,
	'authors': [{ type: Schema.Types.ObjectId, ref: 'author' }]
});

module.exports = mongoose.model('books', booksSchema);
