filterByParent = (allRecords, len, visitedFrom, callback) => {
  for (let i = 0; i < len; i += 1) {
    const record = allRecords[i];
    if (record && !record.from && !visitedFrom.has(record.current)) {
      visitedFrom.add(record.current);
      callback(record.current);
    }
  }
};

const addLevel = (result, level, len) => {
  if (result.length <= level && level < len) result.push({});
};

const test = (result, node, level) => {
  /*
  * [{visible, level, current, to, from}]
  * */
  result.push({ ...node, level });
};

const dfsPattern = (records, len) => {
  const result = []; // [Map(), Map()]
  const visitedFrom = new Set();
  const visitedNodes = new Set();

  const dfs = (nodeId, level = 0) => {
    // we have current node, find node' columns
    // if the node was not visited, add it to the result
    // iterate over the to's node.
    const node = records.find((record) => record.current === nodeId);
    if (!node || visitedNodes.has(node)) return;
    test(result, node, level);

    const { to } = node;
    if (!to) return; // stop condition
    for (let i = 0; i < to.length; i += 1) {
      dfs(to[i], level + 1);
      visitedNodes.add(node);
    }
  };
  filterByParent(records, len, visitedFrom, dfs);
  return result;
};

const parseRecord = (records, minCategories = 0, maxCategories = 20) => {
  // get a single records and parse into nodes and links
  return dfsPattern(records, maxCategories - minCategories);
};

module.exports = {
  parseRecord,
};
