var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/*  GET launch and fill db */
router.get("/updateDB", function (req, res, next) {
  var db = require("../db")
  res.render("update");
  for (let i = 0; i<19; i++){
    fetch("https://ll.thespacedevs.com/2.0.0/launch/?limit=100&offset=" + 100*i).then(response => response.json()).then(data => {
      for (let i = 0; i < data.results.length; i++) {
        const rootDir = data.results[i];
        next = data.next;
        const name = rootDir.name;
        const id = rootDir.id;
        const launchTime = rootDir.window_start;
        const status = rootDir.status.name;
        const tbddate = rootDir.tbddate;
        const holdreason = rootDir.holdreason;
        const failreason = rootDir.failreason;
        const mapurl = rootDir.pad.map_url;
        const padName = rootDir.pad.name;
        const agencyName = rootDir.launch_service_provider.name;
        const rocketImage = rootDir.image;
  
        if (rootDir.mission){
          var missionName = rootDir.mission.name;
          var missionDescription = rootDir.mission.description;
          var missionType = rootDir.mission.type;
        } else {
          var missionName = null;
          var missionDescription = null;
          var missionType = null;
        }
  
        var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
        var launch = new Launches({
          name: name, 			//launches[0]
          id: id,			//launches[0]
          launchTime: launchTime, 		//launches[0]
          status: status, 			//launches[0]
          tbddate: tbddate, 			//launches[0] 
          holdReason: holdreason,  		//launches[0]
          failReason: failreason, 		//launches[0]
          mapurl: mapurl, 		//launches[0] -> location -> pads[0]
          padName: padName,  		//launches[0] -> location -> pads[0]
          agencyName: agencyName, 			//launches[0] -> location -> pads[0] -> agencies[0]
          imageurl: rocketImage,  		//launches[0] -> rocket 
          missionName: missionName,  		//launches[0] -> missions[0] -> name
          missionDescription: missionDescription,     //launches[0] -> missions[0] -> name
          missionType: missionType, 		//launches[0] -> missions[0] -> name
        });
  
        launch.save(function (err) {
          if (err) {
            console.log("Error! " + err.message); 
            return err;
          } else {
            console.log("Post saved");
          }
        });
        // res.end(JSON.stringify(data));
      }
    });
  }
  // res.redirect("/visualizeDB")
});

router.get("/visualizeDB", function (req, res, next) {
  var db = require("../db");
  var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
  Launches.find({}).lean().exec(function (e, docs) {
    console.log(docs.length)
    res.end(JSON.stringify(docs));
  });
});

router.get("/testNewAPI", function (req, res, next) {
  fetch("https://ll.thespacedevs.com/2.0.0/launch/?limit=10").then(response => response.json()).then(data => {
      console.log(data);
      res.end(JSON.stringify(data.results[3], null, 2));
});
})

router.get("/clearDB", function (req, res, next) {
  var db = require("../db");
  var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
  Launches.find({}).remove(function (err) {
    if (err) {
      res.status(500).json({error:err.message});
      res.end();
      return;
    }
    res.json({success:true});
    res.end();
  });
});

router.get("/filter", function (req, res, next) {
  var db = require("../db");
  var selAgencies = req.query.agencies;
  var rocketName = req.query.rocketname;
  var rocketStatus = req.query.rocketStatus;
  var missionName = req.query.missionname;
  var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
  Launches.find(
    {'agencyName':   {$in: selAgencies.split(',')},
     'name': rocketName,
     'status' : rocketStatus,
     'missionName' : missionName
  }).lean().exec(function (e, docs) {
    res.render("test", {'test': JSON.stringify(docs)})
  });
});

module.exports = router;
