const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person")

passport.use(
    new LocalStrategy(async (USERNAME, password, done) => {
      //authentication logic here
      try { 
        const user = await Person.findOne({ username: USERNAME });
        if (!user) return done(null, false, { message: "incorrect username" });
        const ispasswordmatch =await user.comparePassword(password)
  
        if (ispasswordmatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "incorrect password" });
        }
      } catch (error) {
        return done(error);
      }
    })
  );

  module.exports=passport;