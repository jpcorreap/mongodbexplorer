// Code taken from https://stackoverflow.com/questions/16571021/how-to-list-all-mongodb-databases-in-node-js/60546171#60546171
const MongoClient = require("mongodb").MongoClient;
//const ObjectID = require("mongodb").ObjectID;
const client = new MongoClient("", { useUnifiedTopology: true });

// Connect
function MongoUtils() {
  const mu = {};

  mu.databases = {};

  mu.collections = {};

  // Trae todos los elementos de una colección
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

  // Trae todas las colecciones de una base de datos dada
  mu.collections.list = dbName =>
    client
      .connect()
      .then(
        client =>
          client
            .db(dbName)
            .listCollections()
            .toArray() // Returns a promise that will resolve to the list of the collections
      )
      .finally(client.close());

  return mu;
}

module.exports = MongoUtils();
