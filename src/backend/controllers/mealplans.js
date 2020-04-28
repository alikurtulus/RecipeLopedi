const HttpError = require('../models/HttpError')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const MealPlan = require('../models/MealPlan')
const User = require('../models/User')
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')

const getMealPlansByUserId = async (req, res, next) => {

  const userId = req.params.uid
  let user
  try {
      user = await User.findById(userId).populate('mealplans')
  }
  catch(err){
    const error = new HttpError('Something went wrong, please try again',500)
    return next(error)
  }
  if(!user){
    const error = new HttpError('This user does not exists',404)
    return next(error)
  }
  res.status(200).json({mealplans:user.mealplans.map(mealplan => mealplan.toObject({getters:true}))})
}


const createMealPlan = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const error = new HttpError('Invalid inputs passed, please check your data.',422)
      return next(error)
    }
    const {title,date,timeFrame, targetCalories, diet, exclude, meals,nutrients} = req.body
    const newMealPlan = new MealPlan({
      title,
      date,
      timeFrame,
      targetCalories,
      diet,
      exclude,
      meals,
      nutrients,
      creator:req.userData.userId
    })
    let user
    try {
      user = await User.findById(req.userData.userId)
    }
    catch(err){
      const error = new HttpError('Something went wrong, please try again',500)
      return next(error)
    }
    if(!user){
      const error = new HttpError('This user does not exists',404)
      return next(error)
    }
    try{
      const sess = await mongoose.startSession()
      sess.startTransaction()
      await newMealPlan.save({session:sess})
      user.mealplans.push(newMealPlan)
      await user.save({session:sess})
      await sess.commitTransaction()
    }
    catch(err){
    const error = new HttpError('Created mealplans failed, please create again',500)
    return next(error)
  }
   res.status(201).json({mealplan:newMealPlan.toObject({getters:true})})


}
const updateMealPlan = async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    const error = new HttpError('Invalid inputs passed, please check your data.',422)
    return next(error)
  }
  const mealPlanId = req.params.mid
  let existingMealPlan
  try{
       existingMealPlan = await MealPlan.findById(mealPlanId).populate('creator')
  }
  catch(err){
    const error = new HttpError('Something went wrong, please try again',500)
    return next(error)
  }
  if(existingMealPlan.creator.id !== req.userData.userId){
    const error = new HttpError('You are not allowed to update this meal plan',403)
    return next(error)
  }
  const {title, timeFrame, targetCalories, diet, exclude, meals} = req.body
  existingMealPlan.title = title
  existingMealPlan.targetCalories = targetCalories
  existingMealPlan.timeFrame = timeFrame
  existingMealPlan.diet = diet
  existingMealPlan.exclude = exclude
  existingMealPlan.meals = meals

  try{
    await existingMealPlan.save()
  }
  catch(err){
    const error = new HttpError('Something went wrong could not update meal plan', 500)
    return next(error)
  }
  res.status(200).json({mealplan:existingMealPlan.toObject({getters:true})})


}
const deleteMealPlan = async (req, res, next) => {
  const mealPlanId = req.params.mid
  let selectedMealPlan
  try{
     selectedMealPlan = await MealPlan.findById(mealPlanId).populate('creator')
  }
  catch(err){
    const error = new HttpError('Something went wrong, please try again',500)
    return next(error)
  }
  if(!selectedMealPlan){
    const error = new HttpError('This meal plan does not exist',404)
    return next(error)
  }
  if(selectedMealPlan.creator.id !== req.userData.userId){
    const error = new HttpError('You are not allowed to delete this meal plan',403)
    return next(error)
  }
  try{
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await selectedMealPlan.remove({session:sess})
    selectedMealPlan.creator.mealplans.pull(selectedMealPlan)
    await selectedMealPlan.creator.save({session:sess})
    await sess.commitTransaction()
  }
  catch(err){
    const error = new HttpError('Something went wrong, please try again',500)
    return next(error)
  }
  res.status(200).json({message:'Delete mealplan'})

}
exports.createMealPlan = createMealPlan
exports.updateMealPlan  = updateMealPlan
exports.deleteMealPlan = deleteMealPlan
exports.getMealPlansByUserId = getMealPlansByUserId
