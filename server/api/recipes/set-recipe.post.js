const { path, titlesPath } = require('../../consts/firebase');
const { parseReqArguments, generateDocumentName } = require('../../utils/dbHelper');
const getRecipes = require('./recipes.get');

const setDocumentInDb = async (firebase, data, documentId, title) => {
  const documentName = documentId || generateDocumentName(Math.floor(Math.random() * 100));

  const nodeData = { ...data, documentId: documentName };
  const categoryRef = firebase.collection(path).doc(documentName);

  const titlesRef = firebase.collection(titlesPath).doc(documentName);
  const titleData = {
    title,
    documentId: documentName,
  };

  if (documentId) {
    // delete first and then set
    await Promise.all([
        categoryRef.delete(),
        titlesRef.delete(),
    ]);
  }
  await Promise.all([
    categoryRef.set(nodeData),
    titlesRef.set(titleData),
  ]);
};

const parseData = ({ ingredients, description, title }) => ({
  [title]: {
    ingredients,
    description,
  },
});

module.exports = async (args) => {
  const { req, res, firebase } = parseReqArguments(args);
  const { ingredients, description, title, documentId } = req.body;
  try {
    await setDocumentInDb(firebase, parseData({ ingredients, description, title }), documentId, title);
  } catch (e) {
    console.log('error on update', e);
  }
  getRecipes(args);
};
