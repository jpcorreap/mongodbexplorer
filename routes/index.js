var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res) {
  mu.databases.list().then(dbs => {
    console.log("Llegaron los documentos ", dbs, typeof dbs);
    res.render("index", {
      title: "MongoDB Explorer",
      list: dbs.databases
    });
  });
});

module.exports = router;
