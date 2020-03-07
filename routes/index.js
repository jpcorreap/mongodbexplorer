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
  mu.collections.info(req.params.dbName, req.params.colName).then(col => {
    console.log("GET COL OBJECTS: Llegaron las colecciones ", col);
    res.render("col_selected", {
      title: "MongoDB Explorer",
      dbName: req.params.dbName,
      colName: req.params.colName,
      info: col
    });
  });
});

router.get("/database/:dbName/collection/:colName/records", function(req, res) {
  mu.collections.findLast20(req.params.dbName, req.params.colName).then(col => {
    console.log("\n-----------\nIMPORTANTE\nLlegaron las colecciones ", col);
    res.json(col);
  });
});

router.post("/database/:dbName/collection/:colName/insert/", function(
  req,
  res
) {
  console.log("Va a insertar a la base de datos el query ", req);
  mu.collections.insert(req.body.query).then(res.redirect("../"));
});

// For debbuging pourposes
router.get("/testinfo/:dbName/:colName", function(req, res) {
  mu.collections.info(req.params.dbName, req.params.colName).then(col => {
    console.log("Llegaron las colecciones ", col);
    res.send(col);
  });
});

module.exports = router;
