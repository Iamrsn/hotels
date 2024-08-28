const express = require("express");
const person = require("./../models/person");
const { route } = require("./menuRoutes");
const {jwtauthmiddleware,generatetoken} = require("./../jwt")

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //user jo data dega wo body me deta hai to ham usko data me save kr lie
    const newperson = new person(data); //use ham new person banaye or ek person ka structure mere db me tha to uske jaisa ek banaye mt constructor use kie uska or usme data pass kr die jo req.body wala tha..
    const response = await newperson.save(); //await lagaye kuki time lagyega or usko save kr lie mtlb store
    console.log("data saved");

    const payload = {
      id: response.id,
      username:response.username
    }
    console.log(JSON.stringify(payload))
    const token = generatetoken(payload)
    console.log("token is",token)

    res.status(200).json({response:response,token:token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal error" });
  }
});

//login routes

router.post("/login", async (req,res)=>{
   try {
      const {username,password}=req.body;
      //find by username
      const user =  await person.findOne({username:username})
      if(!user || !(await user.comparePassword(password))){
        return res.status(400).json({error:"invalid username password"})
      }
      //generate token
      const payload = {
        id:user.id,
        username:user.username
      }
      const token=generatetoken(payload);
      res.json({token:token})
   } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal error"})
   }
})

//profile route
router.get("/profile",jwtauthmiddleware , async (res,req)=>{
   try {
    const userdata=req.user;
    console.log("userdata is",userdata)

    const userid = userdata.id;
    const user = await person.findById(userid);

    res.status(200).json({user})

   } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal error"})
   }
})

//get method to get the person
router.get("/",jwtauthmiddleware ,async (req, res) => {
  try {
    const aadmilog = await person.find();
    console.log("fetched");
    console.log(aadmilog)
    res.status(200).json(aadmilog);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "internal error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype; //worktype ek variable hai jisem ham usko le rhe or operation  laga rhe uske me..
    if (worktype == "waiter" || worktype == "chef" || worktype == "manager") {
      const response = await person.find({ work: worktype });
      console.log("fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json("internal error");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "internal error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personid = req.params.id;
    const updatedpersondata = req.body;

    const response = await person.findByIdAndUpdate(
      personid,
      updatedpersondata,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "internal error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personid = req.params.id;
    const response = await person.findByIdAndDelete(personid);
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json({message:"person deleted sucessfully"});
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "internal error" });
  }
});

module.exports = router;
