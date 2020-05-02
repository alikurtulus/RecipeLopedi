const  HttpError = require('../models/HttpError')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
   if(req.method === 'OPTIONS'){
     return next()
   }
  try{
    
      const token = req.headers.authorization.split(' ')[1]                                // Bearer 'token'
      console.log(token)
        
        if(!token){                                                                       //If we do not have token throw error
        throw new Error('Authentication failed')
      }
      const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)                // for verifying token we need token and our secret key.
      
      req.userData = {userId:decodedToken.userId}                                       // We will userid to delete and edit . we need that.
      next()                                                                            // It is authenticated go next middleware
  }
  catch(err){    
    console.log(err.message)                                                                         // if our token does not match with the token.
    const error = new HttpError('Authentication failed', 403)
    return next(error)                                                                    // Send error
  }

}
