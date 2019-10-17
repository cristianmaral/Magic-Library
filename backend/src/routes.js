const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const BookController = require('./controllers/BookController');
const UserController = require('./controllers/UserController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Routes referentes aos usuários
routes.post('/users/login', UserController.index);
routes.post('/users/register', UserController.store);

//Routes referentes aos livros
routes.get('/books', BookController.index);
var uploadFields = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }])
routes.post('/books', uploadFields, BookController.store);

//Routes de teste
routes.get('/teste', BookController.teste);

module.exports = routes;