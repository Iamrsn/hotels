const mongoose = require("mongoose");
require("dotenv").config();

//define the mongodb url
const mongoURL = process.env.DB_URL_LOCAL
//const mongoURL=process.env.DB_URL

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
