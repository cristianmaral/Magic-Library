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
  title: String,
  volume: Number
}, {
  toJSON: { virtuals: true }
});

BookSchema.virtual('image_url').get(function () {
  return `http://localhost:3333/images/${this.image}`
})

module.exports = mongoose.model('Book', BookSchema);