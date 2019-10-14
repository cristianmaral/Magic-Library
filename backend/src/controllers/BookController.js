const User = require('../models/User');
const Book = require('../models/Book');

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
    const { filename } = req.file;
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
        image: filename,
        title,
        authors: authors.split(',').map(author => author.trim()),
        edition,
        volume,
        category
      })
      return res.json(book);
    }
  }
};