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
router.get("/database/:dbName", function(req, res) {
  mu.collections.list(req.params.dbName).then(col => {
    console.log("Llegaron las colecciones ", col);
    res.render("db_selected", {
      title: "MongoDB Explorer",
      dbName: req.params.dbName,
      collections: col
    });
  });
});

/* GET registers of a specific collection of a specific database. */
router.get("/database/:dbName/collection/:colName", function(req, res) {
  mu.collections.findLast20(req.params.dbName, req.params.colName).then(col => {
    console.log("GET COL OBJECTS: Llegaron las colecciones ", col);
    res.redirect("/");
    /*res.render("display_records", {
      title: "MongoDB Explorer",
      dbName: req.params.dbName,
      collections: col
    });*/
  });
});

module.exports = router;
