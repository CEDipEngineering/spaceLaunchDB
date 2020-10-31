
/*  Read from db and return all data*/
function getAgencyAndNameList(req, res, next) {
    var db = require("../db");
    var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
    Launches.find({}).lean().exec(function (e, docs) {
        let out = {
            "agencies" : [],
            "names" : []    
        }
        let currName;
        let currAgency;
        for (let comp of docs) {
            currName = comp.name.split("|")[0];
            currAgency = comp.agencyName;

            if (currName && !(out.names.includes(currName))) {
                out.names.push(currName);
            }
            if (currAgency && !(out.agencies.includes(currAgency))) {
                out.agencies.push(currAgency);
            }          
        }
        


        res.json(out);
    });
}
module.exports = getAgencyAndNameList;