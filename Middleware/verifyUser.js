const jwt = require('jsonwebtoken')

const verifyUser = async (req,res,next) =>{

    const token = req.header('Authorization')

    if(!token)
    {
       return res.status(401).json({msg:'Unathorized HTTP, Token not provided'})
    }
  
    const jwtToken = token.replace("Bearer","").trim()
    
    try 
    {
  
      const data =  jwt.verify(jwtToken,"secretkey")

      req.userid = data.userid
      req.useremail = data.email

      next()
    }
    catch(error)
    {
      return res.status(401).json({message:"Unauthorized Invalid token"})
    }

}


module.exports = {verifyUser}