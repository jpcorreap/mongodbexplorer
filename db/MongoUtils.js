// Code taken from https://stackoverflow.com/questions/16571021/how-to-list-all-mongodb-databases-in-node-js/60546171#60546171
const MongoClient = require("mongodb").MongoClient;
//const ObjectID = require("mongodb").ObjectID;
const client = new MongoClient("", { useUnifiedTopology: true });

// Connect
function MongoUtils() {
  const mu = {};

  mu.databases = {};

  mu.collections = {};

  mu.collections.find = query =>
    client
      .connect()
      .then(client => {
        return client
          .db("computadores")
          .collection("salaWuaira")
          .find(query)
          .toArray();
      })
      .finally(() => client.close());

  mu.databases.list = () =>
    client
      .connect()
      .then(client =>
        client
          .db()
          .admin()
          .listDatabases()
      )
      .finally(client.close());
  /*
  mu.collections.list = dbName => {
    mu.connect()
      .then(
        client =>
          client
            .db(dbName)
            .listCollections()
            .toArray() // Returns a promise that will resolve to the list of the collections
      )
      .then(cols => console.log("Collections", cols))
      .finally(() => mu.close());
  };
*/
  return mu;
}

module.exports = MongoUtils();
