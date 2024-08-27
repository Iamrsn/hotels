const express = require("express");
const db = require("./db");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("hello world");
});

//import menuroutes

const menuRoutes= require("./routes/menuRoutes")
app.use("/menu",menuRoutes)

//import person routes

const personRoutes= require("./routes/personRoutes");
app.use("/person",personRoutes)

const PORT=process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("run");
});
