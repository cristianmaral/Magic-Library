const mongoose = require('mongoose');

const TermSchema = new mongoose.Schema({
  term: String,
  tf: [[]],
  idf: Number
});

module.exports = mongoose.model('Term', TermSchema);