const { Int32 } = require("mongodb");
var mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/spaceLaunchDB";
var db = mongoose.connect(uri)


var launchSchema = new mongoose.Schema({
    name : String, 			//launches[0]
    id : String,			//launches[0]
    launchTime : String, 		//launches[0]
    status : String, 			//launches[0]
    tbddate : Number, 			//launches[0] 
    holdReason: String,  		//launches[0]
    failReason: String, 		//launches[0]
    mapurl : String, 		//launches[0] -> location -> pads[0]
    padName : String,  		//launches[0] -> location -> pads[0]
    agencyName : String, 			//launches[0] -> location -> pads[0] -> agencies[0]
    imageurl : String,  		//launches[0] -> rocket 
    missionName : String,  		//launches[0] -> missions[0] -> name
    missionDescription : String,     //launches[0] -> missions[0] -> name
    missionType : String, 		//launches[0] -> missions[0] -> name
}, {collection: "launches"}
);





module.exports = {Mongoose: mongoose, LaunchSchema: launchSchema};