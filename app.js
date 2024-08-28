const express = require("express");
const db = require("./db");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
require("dotenv").config();
const passport = require("./auth")

//middleware function
const logrequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`
  );
  next(); //move on the next phase
};
app.use(logrequest);


app.use(passport.initialize());
const localauthmiddleware= passport.authenticate("local", { session: false })

app.get("/",localauthmiddleware ,(req, res) => {
  res.send("welcome to our hotel");
});

//import menuroutes
const menuRoutes = require("./routes/menuRoutes");
app.use("/menu",menuRoutes);

//import person routes
const personRoutes = require("./routes/personRoutes");
app.use("/person",personRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
  console.log("run");
});
