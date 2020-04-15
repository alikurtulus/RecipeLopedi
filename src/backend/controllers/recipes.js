const HttpError = require('../models/HttpError')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const Recipe = require('../models/Recipe')
const User = require('../models/User')
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')

const getAllRecipes = async (req, res, next) => {                               //We get all recipes to show users' recipes
   let recipes
   try{
     recipes = await Recipe.find({}).exec()
   }
   catch(err){
     const error = new HttpError('Something went wrong',500)
     return next(error)
   }
   if(!recipes){
     const error = new HttpError('Could not find any recipe',404)
     return next(error)
   }

   res.status(200).json({recipes:recipes.map(recipe => recipe.toObject({getters:true}))})
}
const getRecipesByUserId = async (req, res, next) => {                          // We want to get recipes by userId, so we can show user's recipes
   const userId = req.params.uid
   let existingUser
   try{
      existingUser = await User.findById(userId).populate('recipes')
   }
   catch(err){
     const error = new HttpError('Could not find any recipes provided user id',500)
     return next(error)
   }
   if(!existingUser){                                                           // We check if this user exist or not in our database.
     const error = new HttpError('Could not find any user provided user id',404)
     return next(error)
   }
   res.status(200).json({recipes:existingUser.recipes.map(recipe => recipe.toObject({getters:true}))})
}
const createRecipe = async (req, res, next) =>{                                 //We create a new recipe
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    const error = new HttpError('Invalid inputs passed, please check your data.',422)
    return next(error)
  }
  const {title,ingredients,instructions,readyInMinutes, servings, ratings,comments, nutrients,price} = req.body

  const createdRecipe = new Recipe({
    title,
    image:req.file.path,
    ingredients,
    instructions,
    readyInMinutes,
    servings,
    ratings:[],
    creator:req.userData.userId,
    comments:[],
    nutrients:[],
    price
  })
  let user
  try{
    user = await User.findById(req.userData.userId)                             // When we add a new recipe we need user's recipes array,too.That's why We need user who add this recipe.
  }
  catch(err){
    const errors = new HttpError('Something went wrong',500)
    return next(error)
  }
  if(!user){
    const error = new HttpError('This user does not exist',422)
    return next(error)
  }
  try{                                                                          // We need to do this.Because When we add a new recipe that affect user's recipes array, too.We want to make sure to add this recipe both collections.
      const sess = await mongoose.startSession()
      sess.startTransaction()
      await  createdRecipe.save({session:sess})
      user.recipes.push(createdRecipe)
      await user.save({session:sess})
      await sess.commitTransaction()
  }
  catch(err){
    const error = new HttpError('Created recipe failed, please create again 2',500)
    return next(error)
  }
  res.status(201).json({recipe:createdRecipe})
}
const updateRecipe = async (req, res, next) => {                             
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    const error = new HttpError('Invalid inputs passed, please check your data.',422)
    return next(error)
  }
  const recipeId  = req.params.rid
  let existingRecipe
  try
  {
    existingRecipe = await Recipe.findById(recipeId).populate('creator')
  }
  catch(err){
    const error = new HttpError('Something went wrong could not update place', 500)
    return next(error)
   }
   if(existingRecipe.creator.id !== req.userData.userId){                       // We want to know that creator and currentUser same person or not.
      const error = new HttpError('You are not allowed to update this recipe ',403)
      return next(error)
   }
    const {title,ingredients,instructions,readyInMinutes, servings, nutrients,price} = req.body
    existingRecipe.title = title
    existingRecipe.image = req.file.path
    existingRecipe.ingredients= ingredients
    existingRecipe.instructions = instructions
    existingRecipe.readyInMinutes = readyInMinutes
    existingRecipe.servings = servings
    existingRecipe.nutrients  = nutrients
    existingRecipe.price = price
    try{
      await existingRecipe.save()
    }
    catch(err){
      const error = new HttpError('Something went wrong could not update recipe', 500)
      return next(error)
     }
     res.status(200).json({recipe:existingRecipe.toObject({getters:true})})
}
const deleteRecipe = async (req, res, next) => {
  const recipeId = req.params.rid
  let recipe
  try{
    recipe = await Recipe.findById(recipeId).populate('creator')
  }
  catch(err){
    const error  = new HttpError('Something went wrong',500)
    return next(error)
  }
  if(!recipe){
    const error = new HttpError('This recipe does not exist',404)
    return next(error)
  }
  if(recipe.creator.id !== req.userData.userId){                                // We want to know that creator and currentUser same person or not.
    const error = new HttpError('You are not allowed to delete this recipe',403)
    return next(error)
  }
  const imagePath = recipe.image
  try{
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await recipe.remove({session:sess})
    recipe.creator.recipes.pull(recipe)
    await recipe.creator.save({session:sess})
    await sess.commitTransaction()
  }
  catch(err){
    const error  = new HttpError('Something went me wrong',500)
   return next(error)
  }
  fs.unlink(imagePath, err => {
    console.log(err);
  })

     res.status(200).json({message:'Deleted recipe'})
}


exports.getAllRecipes = getAllRecipes
exports.getRecipesByUserId = getRecipesByUserId
exports.createRecipe = createRecipe
exports.updateRecipe = updateRecipe
exports.deleteRecipe = deleteRecipe
