const Term = require('../models/Term');

module.exports = {
  async calculateTFIDF(documentId, documentText, N) {
    documentText = documentText.split(/\s+/);
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
      await Term.findByIdAndUpdate(allTerms[i]._id, { idf: 1 + Math.log(N / (1 + allTerms[i].tf.length)) }, { new: true });
    }
  }
};