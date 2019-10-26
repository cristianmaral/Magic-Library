const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const Book = require('../models/Book');
const User = require('../models/User');
const tfidf = require('../utils/tfidf');
const preprocessing = require('../utils/preprocessing');

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

  async show(req, res) {
    const { book_id } = req.params;

    if (book_id.length != 24) {
      return res.status(400).json({ error: 'Identificador inválido' });
    }
    const book = await Book.findById(book_id);

    if (!book) {
      return res.status(400).json({ error: 'Livro não existente' });
    }
    return res.json(book);
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
    if (user.admin == false) {
      return res.status(400).json({ error: 'Permissões insuficientes para cadastrar livros' });
    }
    const book = await Book.create({
      authors: authors.split(',').map(author => author.trim()),
      category,
      edition,
      image,
      pdf,
      title,
      volume
    });
    const pdfFile = fs.readFileSync(path.resolve(__dirname, '..', '..', 'uploads', 'pdfs', book.pdf));
    pdfText = await pdfParse(pdfFile);
    pdfText = preprocessing.runCompletePreprocessing(pdfText.text);
    const documentsCount = await Book.countDocuments();
    await tfidf.calculateTFIDF(book._id, pdfText, documentsCount);
    return res.json(book);
  },

  async teste(req, res) {
    var text1 = 'andre bruno cristian andre cristian joaquim joaquim joaquim piranha';
    var text2 = 'bola gato tutorial safada piranha cristian andre brunequim bruno';
    var text3 = 'andre bruno brunequim tutorial parceria';

    await tfidf.calculateTFIDF('teste', text1, 1);
    await tfidf.calculateTFIDF('teste2', text2, 2);
    await tfidf.calculateTFIDF('teste3', text3, 3);
    const quantidade = await Term.countDocuments();
    return res.json({ quantidade: quantidade });
  }
};