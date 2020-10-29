
/*  Read from db and return all data*/
function visualize(req, res, next) {
    var db = require("../db");
    var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
    Launches.find({}).lean().exec(function (e, docs) {
        console.log(docs.length)
        res.end(JSON.stringify(docs));
    });
}
module.exports = visualize;