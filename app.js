const express = require("express");
const db = require("./db");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

//import menuroutes

const menuRoutes= require("./routes/menuRoutes")
app.use("/menu",menuRoutes)

//import person routes

const personRoutes= require("./routes/personRoutes");
app.use("/person",personRoutes)


app.listen(3000, () => {
  console.log("run");
});
