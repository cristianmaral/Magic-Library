module.exports = {
  calculateTF(document) {
    tf = {};

    document = document.split(/\s+/);
    //Calculando a frequência dos termos únicos do documento
    document.forEach(function (term) {
      if (tf.hasOwnProperty(term)) {
        tf[term]++;
      }
      else {
        tf[term] = 1;
      }
    });
    //Normalizando a frequência de acordo com a quantidade de termos do documento
    for (term in tf) {
      tf[term] /= document.length;
    }
    return tf;
  },

  splitUniqueTerms(document) {
    splitted_document = [];

    document.split(/\s+/).forEach(function (term) {
      if (splitted_document.indexOf(term) == -1) {
        splitted_document.push(term);
      }
    });
    return splitted_document;
  },

  calculateIDF(corpus) {
    const N = corpus.length;
    let corpus_Terms = {};
    let idf = [];

    for(i=0; i< N; i++) { //Filtrando os documentos em termos únicos
      corpus[i] = module.exports.splitUniqueTerms(corpus[i]);
    }
    for (i = 0; i < N; i++) { //Calculando o IDF de todos os termos de cada documento
      idf[i] = [];
      corpus[i].forEach(function (term) { 
        let n;
        if (corpus_Terms[term] != undefined) {
          n = corpus_Terms[term];
        }
        else {
          n = 1; //Quantidade de documentos que possuem o termo
          for (j = 0; j < N; j++) {
            if (i != j) {
              if (corpus[j].indexOf(term) > -1) {
                n++;
              }
            }
          }
          corpus_Terms[term] = n;
        }
        idf[i][term] = 1 + Math.log(N / (1 + n)); 
      });
    }
    return idf;
  }
};