// Code taken from https://stackoverflow.com/questions/16571021/how-to-list-all-mongodb-databases-in-node-js/60546171#60546171
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning


// Connect
function MongoUtils () {
  const mu={};

  return mu;
}

module.exports = MongoUtils();