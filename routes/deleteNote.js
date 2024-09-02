const express = require("express")
const noteModel = require("../models/note")
const {verifyUser} = require("../Middleware/verifyUser")
const router = express.Router();

router.delete('/:id',verifyUser,async(req,res) => {

    try
    {
        const nid = req.params.id

        const result = await noteModel.deleteOne({_id:nid})

        res.status(200).json({msg:"delete"})

    }
    catch(error)
    {
        console.log('error from showContent ',error)
    }

})

module.exports = router



