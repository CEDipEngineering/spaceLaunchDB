
/*  Read from db and return all data*/
function upcoming(req, res, next) {
    var db = require("../db");
    var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
    Launches.find({}).lean().exec(function (e, docs) {
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