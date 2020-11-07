const fetch = require("node-fetch");

function update(req, res, next) {
    var db = require("../db")
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
          const padName = rootDir.pad.name;
          const agencyName = rootDir.launch_service_provider.name;
          const mapurl = rootDir.pad.map_url;
          var rocketImage;
          if(rootDir.image) {
            rocketImage = rootDir.image;
          } else {
            rocketImage = "https://i.ibb.co/Hnf1PP8/Rocket.jpg";
          }

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
        res.render("update");
      }).catch((e)=>console.log(e));
    }
    // res.redirect("/visualizeDB")
  };

module.exports = update;