const express = require("express")
const contentModel = require("../models/mycontent")
const {verifyUser} = require("../Middleware/verifyUser")
const router = express.Router();

router.get('/:id',verifyUser,async(req,res) => {

    try
    {
        const noteId = req.params.id

        const userid= req.userid 

        // console.log(noteId)

        const content = await contentModel.find({user:userid,note:noteId})

        res.status(200).json({content})

    }
    catch(error)
    {
        console.log('error from showContent ',error)
    }

})

module.exports = router