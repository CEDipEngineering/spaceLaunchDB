function clear(req, res, next) {
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
};

module.exports = clear;