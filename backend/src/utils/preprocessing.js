const accents = require('remove-accents');
const stopwords = require('stopword');

module.exports = {
  convertLinebreakWords(document) {
    document = document.replace(/-\n/g, '');
    return document;
  },

  convertLowercase(document) {
    document = document.toLowerCase();
    return document;
  },

  removeAccents(document) {
    document = accents.remove(document);
    return document;
  },

  removeSpecialCharacters(document) {
    document = document.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~•©→\n\t\r']/g, ' ');
    document = document.replace(/\s{2,}/g, ' '); //Removendo mais de um espaço sucessivo
    return document;
  },

  removeStopwords(document) {
    document = document.split(' ');
    document = stopwords.removeStopwords(document, stopwords.en); //Stopwords em inglês
    document = stopwords.removeStopwords(document, stopwords.br); //Stopwords em português
    return document.join(' ');
  },

  removeUrls(document) {
    document = document.replace(/(?:https?|ftp):\/\/\S+/g, ' '); //http, https e ftp
    document = document.replace(/(www.)\S+/g, ' '); //www
    return document;
  },

  runCompletePreprocessing(document) {
    document = module.exports.convertLowercase(document);
    document = module.exports.convertLinebreakWords(document);
    document = module.exports.removeUrls(document);
    document = module.exports.removeSpecialCharacters(document);
    document = module.exports.removeStopwords(document);
    document = module.exports.removeAccents(document);
    return document;
  }
};