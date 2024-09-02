const express = require("express")
const contentModel = require("../models/mycontent")
const {verifyUser} = require("../Middleware/verifyUser")
const router = express.Router();

router.delete('/:id',verifyUser,async(req,res) => {

    try
    {
        const cid = req.params.id

        const result = await contentModel.deleteOne({_id:cid})

        res.status(200).json({msg:"delete"})

    }
    catch(error)
    {
        console.log('error from showContent ',error)
    }

})

module.exports = router



