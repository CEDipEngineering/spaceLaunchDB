
/*  Read from db and return all data*/
function getAgencyAndNameList(req, res, next) {
    var db = require("../db");
    var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
    Launches.find({}).lean().exec(function (e, docs) {
        let out = {
            "agencies" : [],
            "names" : [],
            "missions" : []    
        }
        let currName;
        let currAgency;
        let currMission;
        for (let comp of docs) {
            currName = comp.name.split("|")[0];
            currAgency = comp.agencyName;
            currMission = comp.name.split("|")[1];

            if (currName && !(out.names.includes(currName))) {
                out.names.push(currName);
            }
            if (currAgency && !(out.agencies.includes(currAgency))) {
                out.agencies.push(currAgency);
            }          
            if (currMission && !(out.missions.includes(currMission))) {
                out.missions.push(currMission);
            }          
        }
        


        res.json(out);
    });
}
module.exports = getAgencyAndNameList;