const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const Book = require('../models/Book');
const User = require('../models/User');
const tfidf = require('../modules/tfidf');

module.exports = {
  async index(req, res) {
    const { searchTerms } = req.query;
    const books = await Book.find({});

    if (!searchTerms) {
      return res.json(books);
    }
    else {
      return res.json(books); //tratar relevância
    }
  },

  async store(req, res) {
    const { title, authors, edition, volume, category } = req.body;
    const image = req.files.image[0].filename;
    const pdf = req.files.pdf[0].filename;
    const { user_id } = req.headers;
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não existente' });
    }
    else if (user.admin == false) {
      return res.status(400).json({ error: 'Permissões insuficientes para cadastrar livros' });
    }
    else {
      const book = await Book.create({
        authors: authors.split(',').map(author => author.trim()),
        category,
        edition,
        image,
        pdf,
        title,
        volume
      });
      return res.json(book);
    }
  },

  teste(req, res) {
    var text1 = 'andre bruno cristian andre cristian joaquim joaquim joaquim piranha';
    var text2 = 'bola gato tutorial safada piranha cristian andre brunequim bruno';
    var text3 = 'andre bruno brunequim tutorial parceria';
    var corpus = [];

    corpus[0] = text1;
    corpus[1] = text2;
    corpus[2] = text3;

    console.log(tfidf.calculateTF(text1));
    console.log(tfidf.calculateTF(text2));

    console.log(tfidf.calculateIDF(corpus));

    return res.json({ corpus });
  }
};