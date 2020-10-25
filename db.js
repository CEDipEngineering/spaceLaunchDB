const { Int32 } = require("mongodb");
var mongoose = require("mongoose");
const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

var launchSchema = new mongoose.Schema({
    name : String, 			//launches[0]
    id : String,			//launches[0]
    launchtime : String, 		//launches[0]
    status : String, 			//launches[0]
    tbddate : Number, 			//launches[0] 
    holdreason: String,  		//launches[0]
    failreason: String, 		//launches[0]
    mapurl : String, 		//launches[0] -> location -> pads[0]
    padname : String,  		//launches[0] -> location -> pads[0]
    agenciename : String, 			//launches[0] -> location -> pads[0] -> agencies[0]
    imageurl : String,  		//launches[0] -> rocket 
    missioname : String,  		//launches[0] -> missions[0] -> name
    missiondescription : String,     //launches[0] -> missions[0] -> name
    missiontype : String, 		//launches[0] -> missions[0] -> name
}, {collection: "launches"}
);





module.exports = {Mongoose: mongoose, LaunchSchema: launchSchema};