var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");
let databasesInfo = {};

/* GET home page. */
router.get("/", function(req, res) {
  if (mu.url === "") res.redirect("/setup");
  else {
    mu.databases.list().then(dbs => {
      console.log("Databases info arrived: ", dbs);
      databasesInfo = dbs.databases;
      res.render("index", {
        title: "MongoDB Explorer",
        databases: databasesInfo
      });
    });
  }
});

router.post("/", function(req, res) {
  console.log("\n-------------------\nSE PRENDIÓ");
  console.log("Llegó la URL ", req.body);
  mu.url = req.body.url;
  res.redirect("/");
});

// Data endpoints
router.get("/setup", function(req, res) {
  res.render("setup", {
    title: "MongoDB Explorer",
    mensaje: "Please provide an URL to connect."
  });
});

/* GET collections of a specific database. */
router.get("/database/:dbName", function(req, res) {
  if (mu.url === "") res.redirect("/setup");
  else {
    mu.collections.list(req.params.dbName).then(col => {
      console.log("Collections info arrived: ", col);
      res.render("db_selected", {
        title: "MongoDB Explorer",
        dbName: req.params.dbName,
        extraInfo: getInfo(req.params.dbName),
        collections: col
      });
    });
  }
});

/* GET registers of a specific collection of a specific database. */
router.get("/database/:dbName/collection/:colName", function(req, res) {
  if (mu.url === "") res.redirect("/setup");
  else {
    mu.collections.info(req.params.dbName, req.params.colName).then(col => {
      console.log("GET COL OBJECTS: Llegaron las colecciones ", col);
      res.render("col_selected", {
        title: "MongoDB Explorer",
        dbName: req.params.dbName,
        colName: req.params.colName,
        info: col
      });
    });
  }
});

router.get("/database/:dbName/collection/:colName/records", function(req, res) {
  if (mu.url === "") res.redirect("/setup");
  else {
    mu.collections
      .findLast20(req.params.dbName, req.params.colName)
      .then(col => {
        console.log(
          "\n-----------\nIMPORTANTE\nLlegaron las colecciones ",
          col
        );
        res.json(col);
      });
  }
});

router.post("/database/:dbName/collection/:colName/insert", function(req, res) {
  if (mu.url === "") res.redirect("/setup");
  else {
    console.log("\n-------------------\nSE PRENDIÓ");
    console.log("Va a insertar a la base de datos el query ", req.body);
    mu.collections
      .insert(req.params.dbName, req.params.colName, req.body)
      .then(res.redirect("//database/:dbName/collection/:colName/"));
  }
});

// For debbuging pourposes
router.get("/testinfo/:dbName/:colName", function(req, res) {
  mu.collections.info(req.params.dbName, req.params.colName).then(col => {
    console.log("Llegaron las colecciones ", col);
    res.send(col);
  });
});

// Auxiliar method
const getInfo = dbName => {
  for (const db of databasesInfo) {
    console.log(
      "\n-------------------------\nCOMPARA ",
      db.name,
      " CON ",
      dbName
    );
    if (db.name === dbName) return db;
  }
};

module.exports = router;
