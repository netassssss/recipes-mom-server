const parseReqArguments = (args) => {
  return {
    firebase: args[3],
    res: args[1],
    req: args[0],
  }
};

const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const createRandomLetter = () => {
  return parseInt(randomInRange(97, 122), 10);
};

const generateDocumentName = (len) => {
  return new Array(len + 1)
    .fill()
    .map(() => String.fromCharCode(createRandomLetter()))
    .join('');
};

const asyncForeach = async (array, callback) => {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
};

module.exports = {
  asyncForeach,
  parseReqArguments,
  generateDocumentName,
};
