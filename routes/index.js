var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const visualize = require('./visualize');
const update = require('./update');
const clear = require('./clear');
const _filter = require('./filter');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Visualizes database */
router.get('/visualizeDB', visualize);

/*  GET launch and fill db */
router.get("/updateDB", update);

/*  Delete all data from db */
router.get("/clearDB", clear);

/*  Returns portions of the db, filtered by parameters of fetch*/
router.get("/filter", _filter);

// /*  Test api fetch */
// router.get("/testNewAPI", function (req, res, next) {
//   fetch("https://ll.thespacedevs.com/2.0.0/launch/?limit=10").then(response => response.json()).then(data => {
//       console.log(data);
//       res.end(JSON.stringify(data.results[3], null, 2));
// });
// })

module.exports = router;
