const express = require("express")
const menuitem = require("./../models/menuitem");

const router = express.Router();

router.post("/", async(req, res) => {
    try{
          const data = req.body; //user jo data dega wo body me deta hai to ham usko data me save kr lie
          const newmenu=new menuitem(data); //use ham new person banaye or ek person ka structure mere db me tha to uske jaisa ek banaye mt constructor use kie uska or usme data pass kr die jo req.body wala tha..
         const savemenu= await newmenu.save() //await lagaye kuki time lagyega or usko save kr lie mtlb store
         console.log("data saved");
         res.status(200).json(savemenu);
    }
    catch(error){
      console.error(error);
      res.status(400).json({error:"internal error"})
    }
  });
  router.get("/", async (req,res)=>{
    try{
        const totalmenu=await menuitem.find(); //jo ham import karaye hai menuitem ussme se fin krege
        res.status(200).json(totalmenu);
    }
    catch(error){
        console.error(error);
        res.status(400).json({error:"internal error"})
      }
  })
  router.get("/:Taste", async(req,res)=>{
    try {
      const Taste = req.params.Taste;
      if(Taste=='sweet' || Taste=='spicy' || Taste=='sour'){
        const response=await menuitem.find({taste:Taste});
        console.log("fetched");
        res.status(200).json(response)
      }
      else{
        res.status(400).json("internal error")
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({error:"internal error"})
    }
  })

  module.exports=router;