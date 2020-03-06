// Code taken from https://stackoverflow.com/questions/16571021/how-to-list-all-mongodb-databases-in-node-js/60546171#60546171
const MongoClient = require("mongodb").MongoClient;

const url = "";

function MongoUtils() {
  const mu = {};

  // Connection to database
  mu.connect = () => {
    const client = new MongoClient(url, {
      useUnifiedTopology: true
    });
    return client.connect();
  };

  // ----------------------
  // Databases operations
  // ----------------------

  mu.databases = {};

  // Get databases of MongoDB connection
  mu.databases.list = () =>
    mu.connect().then(client =>
      client
        .db()
        .admin()
        .listDatabases()
        .finally(() => client.close())
    );

  // Get statistics of specific database
  mu.databases.info = dbName =>
    mu.connect().then(client =>
      client
        .db(dbName)
        .runCommand({
          dbStats: 1
        })
        .finally(() => client.close())
    );

  // ----------------------
  // Collections operations
  // ----------------------

  mu.collections = {};

  // Get collections of a certain database
  mu.collections.list = dbName =>
    mu.connect().then(client =>
      client
        .db(dbName)
        .listCollections()
        .toArray()
        .finally(() => client.close())
    );

  // Get 20 last documents of an specific collection's database
  mu.collections.findLast20 = (dbName, colName) =>
    mu.connect().then(client =>
      client
        .db(dbName)
        .collection(colName)
        .find({})
        .limit(20)
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close())
    );

  return mu;
}

module.exports = MongoUtils();
