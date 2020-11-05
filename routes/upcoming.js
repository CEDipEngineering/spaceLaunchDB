
/*  Read from db and return all data*/
function upcoming(req, res, next) {
    var db = require("../db");
    var selAgencies = req.query.agencies;
    var rocketName = req.query.rocketName;
    var rocketStatus = req.query.rocketStatus;
    var missionName = req.query.missionName;
  

    if (selAgencies) {
      selAgencies = selAgencies.split(',');
      for (let i = 0; i<selAgencies.length;i++) {
        selAgencies[i] = new RegExp(selAgencies[i], 'i');
      }
      console.log("agencies: " + selAgencies)
    } else {
      selAgencies = null;
      console.log("No agencies filtered");
    }
    if (rocketName) {
      console.log(rocketName)
      rocketName = rocketName.split(',');
      for (let i = 0; i<rocketName.length;i++) {
        rocketName[i] = new RegExp(rocketName[i], 'i');
      }
      console.log("rocketName: " + rocketName)
    } else {
      rocketName = null;
      console.log("No rocketName filtered");
    }
    if (rocketStatus) {
      rocketStatus = rocketStatus.split(',');
      for (let i = 0; i<rocketStatus.length;i++) {
        rocketStatus[i] = new RegExp(rocketStatus[i], 'i');
      }
      console.log("rocketStatus: " + rocketStatus)
    } else {
      rocketStatus = null;
      console.log("No rocketStatus filtered");
    }
    if (missionName) {
      missionName = missionName.split(',');
      for (let i = 0; i<missionName.length;i++) {
        missionName[i] = new RegExp(missionName[i], 'i');
      }
      console.log("missionName: " + missionName)
    } else {
      missionName = null;
      console.log("No missionName filtered");
    }
  
    console.log('\n');
  
  
    var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
    Launches.find(
        { $and:
        [
          {$or: [ 
            { $expr: !selAgencies || !selAgencies.length }, 
            { 'agencyName': { $in: selAgencies } }
          ]},
          {$or: [ 
            { $expr: !rocketStatus || !rocketStatus.length }, 
            { 'status': { $in: rocketStatus } }
          ]},
          {$or: [ 
            { $expr: !rocketName || !rocketName.length }, 
            { 'name': { $in: rocketName}}
          ]},
          {$or: [ 
            { $expr: !missionName || !missionName.length }, 
            { 'missionName': { $in: missionName } }
          ]}    
        ]
      }).lean().exec(function (e, docs) {
        dates = [];
        for (i of docs) {
            if (new Date(i.launchTime) > new Date()){
                dates.push(i)
            }
        }
        dates = dates.sort((a,b)=> (new Date(a.launchTime) - new Date(b.launchTime)))
        res.json(dates)
    });
}
module.exports = upcoming;