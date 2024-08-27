const mongoose = require("mongoose");

//define the mongodb url
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

//setup mongodb connection
mongoose.connect(mongoURL);
//get default connection
//mongoose maintains a default connection object repersenting the mongodb connection
const db = mongoose.connection;

//event listner for db
db.on("connected", () => console.log("connected mongodb server"));
db.on("error", (err) => console.log("connected mongodb server", err));
db.on("disconnected", () => console.log("disconnected mongodb server"));

//export databse connection
module.exports = db;
