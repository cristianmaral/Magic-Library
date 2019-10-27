const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const BookController = require('./controllers/BookController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Routes referentes às sessões de usuário
routes.post('/login', SessionController.login);

//Routes referentes aos usuários
routes.post('/users', UserController.store);

//Routes referentes aos livros
routes.get('/books', BookController.index);
routes.get('/books/:book_id', BookController.show);
var uploadFields = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }])
routes.post('/books', uploadFields, BookController.store);

module.exports = routes;