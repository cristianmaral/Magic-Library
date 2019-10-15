const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-uqnij.mongodb.net/magic_library?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //Conectando com o MongoDB Atlas

app.use(cors());
app.use(express.json()); //Permitindo a utilização do formato JSON nas requisições
app.use('/files/images', express.static(path.resolve(__dirname, '..', 'uploads/images')));
app.use('/files/pdfs', express.static(path.resolve(__dirname, '..', 'uploads/pdfs')));
app.use(routes); //Estabelecendo routes do servidor
app.listen(3333); //Inicializando o servidor na porta 3333