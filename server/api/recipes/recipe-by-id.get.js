const { path } = require('../../consts/firebase');
const { parseReqArguments } = require('../../utils/dbHelper');

module.exports = async (args) => {
    const { res, firebase, req } = parseReqArguments(args);
    const { documentId } = req.body;

    let data = {};

    try  {
        const getDoc = firebase.collection(path).doc(documentId);
        const ref = await getDoc.get();
        data = await ref.data();
    } catch (e) {
        console.log('error fetching titles', e);
    } finally {
        res.json({ data });
    }
};