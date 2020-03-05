// Code taken from https://stackoverflow.com/questions/16571021/how-to-list-all-mongodb-databases-in-node-js/60546171#60546171
const MongoClient = require("mongodb").MongoClient;

// Connect
function MongoUtils() {
  const mu = {};

  mu.connect = () => {
    const client = new MongoClient(
      "mongodb+srv://vaca:vaca123@cluster0-3lhwp.mongodb.net/test?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true
      }
    );
    return client.connect();
  };

  mu.databases = {};

  mu.databases.list = () => {
    mu.connect()
      .then(
        client =>
          client
            .db()
            .admin()
            .listDatabases() // Returns a promise that will resolve to the list of databases
      )
      .then(dbs => {
        console.log("Mongo databases", dbs);
      })
      .finally(() => client.close()); // Closing after getting the data
  };

  mu.collections = {};

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

  return mu;
}

module.exports = MongoUtils();
