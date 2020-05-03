const HttpError = require('../models/HttpError')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const User = require('../models/User')
const mongoose = require('mongoose')
const {validationResult} = require('express-validator')

const signUp = async(req, res, next) => {

   const errors = validationResult(req)                                         //We check all inputs are valid or not from the client.
   console.log(errors)

  if(!errors.isEmpty()){
    const error = new HttpError('Invalid inputs passed, please check your data.',422)
    return next(error)
  }

  const {username,email,password,passwordConfirmation,age,gender} = req.body                         // We get all inputs with req.body
  let existingUser
   try{
         existingUser =  await User.findOne({email:email})
   }
   catch(err){                                                                  // If we  have an issue with database when we send command about existing user.
     const error =  new HttpError('Sign Up failed ,please try again ',500)
     return next(error)
   }

   if(existingUser){                                                            // We check if this user exist or not in our database.
     const error =  new HttpError('user already exists ',422)
     return next(error)
   }
   if(passwordConfirmation !== password){
     const error = new HttpError('password does not match ',422)
     return next(error)
   }

   let hashedPassword
   try {
        hashedPassword = await bcrypt.hash(password,12)                         // We hashed our plainText passoword. Because We do not want to store password as plaintext.
   }
   catch(err){
     const error =  new HttpError('Sign Up failed ,please try again ',500)
     return next(error)
   }
  
   const newUser = new User({
     username,
     email,
     password:hashedPassword,
     age,
     image:req.file.path,
     gender,
     recipes:[],
     mealplans:[],
     myFavouriteRecipes:[]
   })

   try{
    await newUser.save()
   }
   catch(err){
     const error =  new HttpError('Sign Up failed ,please try again ',500)
     return next(error)
   }
   let token
   try{
     token = jwt.sign(
    { userId:newUser.id,
      email:newUser.email},
        process.env.JWT_SECRET_KEY,
    { expiresIn:'1h'})
   }
   catch(err){
     const error =  new HttpError('Sign Up failed ,please try again ',500)
     return next(error)
   }
    res.status(201).json({userId:newUser.id,email:newUser.email,token})
}

const login = async(req, res, next) => {
  const errors = validationResult(req)                                          //We check all inputs validations
  if(!errors.isEmpty()){
    const error = new HttpError('Invalid inputs passed, please check your data.',422)
    return next(error)
  }
  const {email,password} = req.body
  let existingUser
  try{
    existingUser = await User.findOne({email:email})                            //We check user does not exist or not in our database with email.

   }
  catch(err){
    const error =  new HttpError('Login failed ,please try again ',500)
    return next(error)
  }
  if(!existingUser){                                                            // if user does not exist in our database send error message.
    const error = new HttpError('Invalid crenditials, could not log you in.',401)
      return next(error)
  }
  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password,existingUser.password)      //We compare plaintext password with our hashedPassword in our database.if they match return true.
  }
  catch(err){
    const error = new HttpError('Could not log you in,please check credenticals and try again.',500)
    return next(error)
  }
  if(!isValidPassword){                                                         // Passwords does not match.
    const error = new HttpError('Invalid crenditials, could not log you in.',403)
    return next(error)
  }
  let token
  try{
    token = jwt.sign({                                                          //We create token with these properties.
      userId:existingUser.id,
      email:existingUser.email
      },
      process.env.JWT_SECRET_KEY,
      {expiresIn:'1h'})
  }
  catch(err){
    const error =  new HttpError('Login failed ,please try again ',500)
    return next(error)
  }
  res.status(200).json({                                                        //Everthing is fine.Send response with these.
    message:`${existingUser.username} logged in.`,
    userId:existingUser.id,
    email:existingUser.email,
    token:token
  })

}
const profile = async(req, res, next) => {
    
  let existingUser
  try{  
        existingUser = await User.findById(req.userData.userId,'-password').populate('mealplans').populate('recipes').populate('myFavouriteRecipes').exec()
        console.log(existingUser)
     }
  catch(err){
    
       const error = new HttpError('Profile failed, please try again', 500)
       return next(error)
     }
     if(!existingUser){
       const error = new HttpError('User does not exist',422)
       return next(error)
     }
    res.status(200).json({user:existingUser.toObject({getters:true})})
}
const getUserById = async (req,res,next) => {
  const {userId} = req.body
  let existingUser 
  try{
    existingUser = await User.findById(userId,'-password').exec()
        if(!existingUser){
          const error = new HttpError('User does not exist',422)
          return next(error)
        }
        res.status(200).json({user:existingUser.toObject({getters:true})})
    
  }
  catch(err){
     const error = new HttpError('Profile failed, please try again', 500)
       return next(error)
  }
}

const editUser = async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    const error = new HttpError('Invalid inputs passed, please check your data.',422)
    return next(error)
  }
 
  const {id,username,email,password,passwordConfirmation,age,gender} = req.body                         // We get all inputs with req.body
  let existingUser

  try{
     existingUser = await User.findById(id,'-password').exec()
     if(!existingUser){
      const error = new HttpError('This user does not exist', 404)
      return next(error)
     }
     if(existingUser.id !== req.userData.userId){
      const error = new HttpError('You are not allowed to update this user ',403)
      return next(error)

     }
     let checkUser
     try{
       checkUser = await User.findOne({username:username})
       if(checkUser && checkUser.id !== req.userData.userId){
        const error = new HttpError('This username already   exist', 401)
        return next(error)
       }
       else{
         try{
          checkUser = await User.findOne({email:email})
          if(checkUser && checkUser.id !== req.userData.userId){
            const error = new HttpError('This email already   exist', 401)
            return next(error)
           }
           existingUser.username = username
           existingUser.email = email
           existingUser.age = age
           existingUser.gender = gender
           existingUser.image = req.file.path
           if(passwordConfirmation !== password){
            const error = new HttpError('password does not match ',422)
            return next(error)
          }
        
          let hashedPassword
            try{  
                  hashedPassword = await bcrypt.hash(password,12)                         // We hashed our plainText passoword. Because We do not want to store password as plaintext.
             }
            catch(err){
              console.log(err.message)
              const error =  new HttpError('Update failed ,please try again ',500)
              return next(error)
            }
            existingUser.password = hashedPassword
            try{
              await existingUser.save()
            }
            catch(err){
              console.log(err.message)
              const error = new HttpError('Something went wrong could not update user', 500)
              return next(error)
            }
         }
         catch(err){
          const error = new HttpError('Something went wrong', 500)
          return next(error)
         }
       }
     }
     catch(err){
      const error = new HttpError('Something went wrong', 500)
      return next(error)
     }

  }
  catch(err) {
    const error = new HttpError('Something went wrong, please try again', 500)
    return next(error)

  }
  res.status(200).json({user:
    {
       id:existingUser.id,
       email:existingUser.email,
       username:existingUser.username,
       age:existingUser.age,
       gender:existingUser.gender,
       recipes:existingUser.recipes,
       mealplans:existingUser.mealplans,
       image:existingUser.image,
       myFavouriteRecipes:existingUser.myFavouriteRecipes

      }})
}
exports.signUp = signUp
exports.login = login
exports.profile = profile
exports.getUserById = getUserById
exports.editUser = editUser

