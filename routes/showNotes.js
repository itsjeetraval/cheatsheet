const express = require("express");
const noteModel = require("../models/note");
const { verifyUser } = require("../Middleware/verifyUser");
const router = express.Router();


router.get('/',verifyUser,async (req,res) => {

      try 
      {
          const userid = req.userid

          const notes = await noteModel.find({user:userid})

          res.status(200).json({notes})
        
      }
      catch(error)
      {
          console.log(`error from the showNotes ${error} `)
      }
})

module.exports = router