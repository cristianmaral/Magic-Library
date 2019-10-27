const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const Book = require('../models/Book');
const User = require('../models/User');
const tfidf = require('../utils/tfidf');
const preprocessing = require('../utils/preprocessing');

module.exports = {
  async index(req, res) {
    var { searchTerms, category } = req.query;

    if (!searchTerms) {
      const books = category ? await Book.find({ category }) : await Book.find({});
      return res.json(books);
    }
    else {
      searchTerms = preprocessing.runCompletePreprocessing(searchTerms);
      documents = await tfidf.searchDocuments(searchTerms);
      books = [];
      for (i = 0; i < documents.length; i++) {
        book = await Book.findById(documents[i][0]);
        books.push(book);
      }
      return res.json(books);
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
  }
};