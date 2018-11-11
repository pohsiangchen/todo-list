var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: { type: String, required: true, min: 1, max: 100 },
  done: { type: Boolean, default: false }
});

// Export model.
module.exports = mongoose.model('Todo', TodoSchema);
