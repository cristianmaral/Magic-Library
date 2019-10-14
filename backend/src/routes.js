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
routes.post('/books', upload.single('image'), BookController.store);

module.exports = routes;