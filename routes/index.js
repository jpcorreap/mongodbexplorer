var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.databases.list().then(dbs => {
    console.log("Llegaron los documentos ", dbs, typeof dbs);
    res.render("index", {
      title: "MongoDB Explorer",
      databases: dbs.databases
    });
  });
});

// Data endpoints

/* GET collections of a specific database. */
router.get("/set/:dbName", function(req, res) {
  mu.collections.list(req.params.dbName).then(col => {
    console.log("Llegaron las colecciones ", col);
    res.render("db_selected", {
      title: "MongoDB Explorer",
      dbName: req.params.dbName,
      collections: col
    });
  });
});

module.exports = router;
