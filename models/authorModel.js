var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var authorSchema = new Schema({
	'name' : String
});

module.exports = mongoose.model('author', authorSchema);
