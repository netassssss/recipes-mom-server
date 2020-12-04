const { path } = require('../../consts/firebase');
const { parseReqArguments } = require('../../utils/dbHelper');

module.exports = async (args) => {
  const { firebase, res, req } = parseReqArguments(args);
  const { documentId } = req.query;

  let data = {};
  try {
    if (documentId) {
      const doc = await firebase.collection(path).doc(documentId);
      const docData = await doc.get();
      data = docData.data();
    } else {
      const getDoc = await firebase.collection(path).get();
      data = getDoc.docs.map(doc => doc.data());
    }
  } catch (e) {
    console.log('error fetching data', e);
  } finally {
    res.json({ data });
  }
};
