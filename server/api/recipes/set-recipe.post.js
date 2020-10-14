const { path } = require('../../consts/firebase');
const { parseReqArguments, generateDocumentName } = require('../../utils/dbHelper');
const getRecipes = require('./recipes.get');

const setDocumentInDb = async (firebase, data, documentId) => {
  const documentName = documentId || generateDocumentName(Math.floor(Math.random() * 100));

  const nodeData = { ...data, documentId: documentName };
  const categoryRef = firebase.collection(path).doc(documentName);

  if (documentId) {
    // delete first and then set
    await categoryRef.delete();
  }
  await categoryRef.set(nodeData);
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
    await setDocumentInDb(firebase, parseData({ ingredients, description, title }), documentId);
  } catch (e) {
    console.log('error on update', e);
  }
  getRecipes(args);
};
