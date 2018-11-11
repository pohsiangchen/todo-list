var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: { type: String, required: true, min: 1, max: 100 },
  done: { type: Boolean, default: false }
});

TodoSchema
.virtual('url')
.get(function () {
  return '/todos/' + this._id;
});

// Export model.
module.exports = mongoose.model('Todo', TodoSchema);
