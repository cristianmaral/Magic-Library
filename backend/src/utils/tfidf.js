const Term = require('../models/Term');

module.exports = {
  async calculateTFIDF(documentId, documentText, documentsCount) {
    documentText = documentText.split(/\s+/);
    documentText = documentText.filter(term => term !== '');
    documentTF = {};

    //Contando a ocorrência de cada termo do documento
    for (i = 0; i < documentText.length; i++) {
      if (documentTF.hasOwnProperty(documentText[i])) {
        documentTF[documentText[i]]++;
      }
      else {
        documentTF[documentText[i]] = 1;
      }
    }
    //Inserindo os termos do documento no banco de dados
    for (documentTerm in documentTF) {
      term = await Term.findOne({ term: documentTerm });
      if (!term) { //Termo ainda não foi inserido no banco de dados
        await Term.create({
          term: documentTerm,
          tf: [[documentId, documentTF[documentTerm] / documentText.length]],
          idf: 0
        });
      }
      else { //Termo já foi inserido no banco de dados anteriormente
        term.tf.push([documentId, documentTF[documentTerm] / documentText.length]);
        await Term.findByIdAndUpdate(term._id, { tf: term.tf }, { new: true });
      }
    }
    //Atualizando o IDF de todos os termos do banco de dados
    allTerms = await Term.find({}); //Buscando todos os termos
    for (i = 0; i < allTerms.length; i++) {
      await Term.findByIdAndUpdate(allTerms[i]._id, { idf: 1 + Math.log(documentsCount / (1 + allTerms[i].tf.length)) }, { new: true });
    }
  },

  async searchDocuments(searchTerms) {
    searchTerms = searchTerms.split(/\s+/);
    searchTerms = searchTerms.filter(term => term !== '');
    documents = {};

    for (i = 0; i < searchTerms.length; i++) {
      term = await Term.findOne({ term: searchTerms[i] });
      if (term) {
        for (j = 0; j < term.tf.length; j++) {
          if (documents.hasOwnProperty(term.tf[j][0])) {
            documents[term.tf[j][0]] += term.tf[j][1] * term.idf;
          }
          else {
            documents[term.tf[j][0]] = term.tf[j][1] * term.idf;
          }
        }
      }
    }
    // Ordenando os livros por ordem de relevância (do maior para o menor)
    documents = Object.keys(documents).map(function (documentId) {
      return [documentId, documents[documentId]];
    });
    documents.sort(function (first, second) {
      return second[1] - first[1];
    });
    return documents;
  }
};