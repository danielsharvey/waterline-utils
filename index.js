module.exports = {
  query: {
    tokenizer: require('./lib/query/tokenizer'),
    analyzer: require('./lib/query/analyzer'),
    converter: require('./lib/query/converter')
  },
  joins: {
    queryCache: require('./lib/joins/query-cache'),
    detectChildrenRecords: require('./lib/joins/detect-children-records')
  }
};
