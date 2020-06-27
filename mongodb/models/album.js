var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaAlbum = new Schema({
  urlRym: String,
  _id: String,
  
  title: String,
  artist: String,
  year: String,
  
  rating: Number,
  review: String
}, { collection: 'albums', versionKey: false});

module.exports = mongoose.model('album', schemaAlbum);