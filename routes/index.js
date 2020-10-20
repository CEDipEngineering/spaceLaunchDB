var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/*  GET launch and fill db */
router.get("/updateDB", function (req, res, next) {
  fetch("https://launchlibrary.net/1.4/launch/1000").then(response => response.json()).then(data => {
    console.log(data);
    var db = require("../db")

    const rootDir = data.launches[0];
    const locationDir = rootDir.location.pads[0];
    const missionsDir = rootDir.missions[0];
    const name = rootDir.name;
    const id = rootDir.id;
    const launchTime = rootDir.windowStart;
    const status = rootDir.status;
    const tbddate = rootDir.tbddate;
    const holdreason = rootDir.holdreason;
    const failreason = rootDir.failreason;
    const mapurl = locationDir.mapURL;
    const padname = locationDir.name;
    const agencyName = missionsDir.agencies[0].name;
    const abbrev = missionsDir.agencies[0].abbrev;
    const agencyWikiURL = missionsDir.agencies[0].wikiURL;
    const rocketImage = rootDir.rocket.imageURLs;
    const missionName = missionsDir.name;
    const missionDescription = missionsDir.description;
    const missionWikiURL = missionsDir.wikiURL;
    const missionType = missionsDir.typeName;
    const vidURLs = rootDir.vidURLs;


    var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches'); 
    var launch = new Launches({ 
      name : name, 			//launches[0]
      id : id,			//launches[0]
      launchtime : launchTime, 		//launches[0]
      status : status, 			//launches[0]
      tbddate : tbddate, 			//launches[0] 
      holdreason: holdreason,  		//launches[0]
      failreason: failreason, 		//launches[0]
      mapurl : mapurl, 		//launches[0] -> location -> pads[0]
      padname : padname,  		//launches[0] -> location -> pads[0]
      agenciename : agencyName, 			//launches[0] -> location -> pads[0] -> agencies[0]
      abbrev : abbrev, 		//launches[0] -> location -> pads[0] -> agencies[0]
      agenciewikiurl : agencyWikiURL, 	//launches[0] -> location -> pads[0] -> agencies[0]
      imageurl : rocketImage,  		//launches[0] -> rocket 
      missioname : missionName,  		//launches[0] -> missions[0] -> name
      missiondescription : missionDescription,     //launches[0] -> missions[0] -> name
      missionwikiurl: missionWikiURL, 		//launches[0] -> missions[0] -> name
      missiontype : missionType, 		//launches[0] -> missions[0] -> name
      vidurls : vidURLs 		//launches[0]
    }); 

    launch.save(function (err) { if (err) { 
      console.log("Error! " + err.message); returnerr; 
    } else { 
      console.log("Post saved"); 
    } 
    });


    
    res.end(JSON.stringify(data));
    return;
  })
});

router.get("/visualizeDB", function (req, res, next) {
  var db = require("../db");
  var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches'); 
  Launches.find({}).lean().exec(function(e,docs){
    res.end(JSON.stringify(docs));
  });
});

module.exports = router;
