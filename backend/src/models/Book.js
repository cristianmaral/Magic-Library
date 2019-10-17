const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  authors: [String],
  category: {
    type: String,
    enum: [
      'Administração',
      'Agronomia',
      'Ciência da Computação',
      'Ciências Biológicas',
      'Educação Física',
      'Física',
      'Gestão Ambiental',
      'Engenharia de Alimentos',
      'Química',
      'Matemática'
    ]
  },
  edition: Number,
  image: String,
  pdf: String,
  title: String,
  tfidf: [],
  volume: Number
}, {
  toJSON: { virtuals: true }
});

BookSchema.virtual('image_url').get(function () {
  return `http://localhost:3333/files/images/${this.image}`
});

BookSchema.virtual('pdf_url').get(function () {
  return `http://localhost:3333/files/pdfs/${this.pdf}`
});

module.exports = mongoose.model('Book', BookSchema);