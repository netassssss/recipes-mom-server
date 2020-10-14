const { path } = require('../../consts/firebase');
const { parseReqArguments } = require('../../utils/dbHelper');
const { parseRecord } = require('../../utils/treeHelper');

module.exports = async (args) => {
  const { firebase, res } = parseReqArguments(args);

  let data = {};
  try {
    const getDoc = await firebase.collection(path).get();
    data = getDoc.docs.map(doc => doc.data());
  } catch (e) {
    console.log('error fetching data', e);
  } finally {
    res.json({ data });
  }
};
