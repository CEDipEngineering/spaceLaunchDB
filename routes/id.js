function findById(req, res, next) {
    var id = req.query.id;
    var db = require("../db");
    var Launches = db.Mongoose.model('launches', db.LaunchSchema, 'launches');
    Launches.findOne({"id": id}).lean().exec(function (e, docs) {
        console.log(docs.length)
        res.json(docs);
    });
  }
module.exports = findById;