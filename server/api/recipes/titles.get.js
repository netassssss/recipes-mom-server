const { titlesPath } = require('../../consts/firebase');
const { parseReqArguments } = require('../../utils/dbHelper');

const getAllTitles = async (firebase) => {
    try {
        const getDoc = await firebase.collection(titlesPath).get();
        return getDoc.docs.map(doc => doc.data());
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = async (args) => {
    const { res, firebase } = parseReqArguments(args);
    let data = {};

    try  {
        data = await getAllTitles(firebase);
    } catch (e) {
        console.log('error fetching titles', e);
    } finally {
        res.json({ data });
    }
};