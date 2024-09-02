const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const router = express.Router()
const {verifyUser} = require('../Middleware/verifyUser')


router.get('/',verifyUser, async (req, res) => {

    try 
    {
        const userData = req.user;
        // console.log(userData)
        res.status(200).json({userData})
    }
    catch(error)
    {
      console.log(`error from the user route ${error} `)
    }
  
})



module.exports = router