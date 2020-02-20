const jwt = require('jsonwebtoken')
const HttpError = require('../models/HttpError')

module.exports = (req, res , next) => {
  if(req.method === "OPTIONS"){
   return  next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]                       //We took token from headers authorization.( Bearer 'token')
    if(!token){                                                                 // We check token if it is falsy.If it is, We will send error for authentication failed
      const error = new HttpError('Authentication failed.')
      throw error
    }
    const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY)            // for verifying token we need token and our secret key.
    req.userData = {userId:decodedToken.userId}                                 // We will userid to delete and edit  places. we need that.
      next()                                                                    // It is authenticated go next middleware

  }
  catch(err){                                                                   // if our token does not match with the token.
    const error = new HttpError('Authentication failed', 403)
    return next(error)                                                          // Send error
  }
}
