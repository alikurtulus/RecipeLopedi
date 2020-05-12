const HttpError = require('../models/HttpError')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const MealPlan = require('../models/MealPlan')
const User = require('../models/User')
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const Meal  = require('../models/Meal')
const Nutrient = require('../models/Nutrient')
const qs = require('qs')

const getMealPlansByUserId = async (req, res, next) => {

  const userId = req.params.uid
  let user
  try {
      user = await User.findById(userId).populate('mealplans')
  }
  catch(err){
    const error = new HttpError('Something went wrong, please try again2',500)
    return next(error)
  }
  if(!user){
    const error = new HttpError('This user does not exists',404)
    return next(error)
  }
  res.status(200).json({mealplans:user.mealplans.map(mealplan => mealplan.toObject({getters:true}))})
}

const handleMealPlans = (arr,myMeals,myNutrients) =>{
  try{
    let mydaily = qs.parse(arr.meals)
    for(let i=0;i<arr.meals.length;i++){
      let newMeal = new Meal({
        title:mydaily[i].title,
        readyInMinutes:mydaily[i].readyInMinutes,
        servings:mydaily[i].servings,
        sourceUrl:mydaily[i].sourceUrl
      })
      myMeals.push(newMeal)
    }

    let newNutrient = new Nutrient({
      calories:arr.nutrients.calories,
      carbohydrates:arr.nutrients.carbohydrates,
      fat:arr.nutrients.fat,
      protein:arr.nutrients.protein

    })
    myNutrients.push(newNutrient)
    return [myMeals,myNutrients]
  }
  catch(err){
    const error = new HttpError('Invalid inputs passed, please check your data. ',422)
    return error
  }
}

const createMealPlan = async (req, res, next) =>{     
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    const error = new HttpError('Invalid inputs passed, please check your data.',422)
    return next(error)
  } 
   
    const {title,date,timeFrame,targetCalories,myPlan,diet,exclude,creator} = req.body
    let allResult = []
    let myMeals = []
    let myNutrients = []
     console.log(myPlan)
    let weeklyPl  = []
    if(myPlan.week){
      weeklyPl[0] = myPlan.week.monday
      weeklyPl[1] = myPlan.week.tuesday
      weeklyPl[2] = myPlan.week.wednesday
      weeklyPl[3] = myPlan.week.thursday
      weeklyPl[4] = myPlan.week.friday
      weeklyPl[5] = myPlan.week.saturday
      weeklyPl[6] = myPlan.week.sunday

      for(let i=0; i<weeklyPl.length;i++){
        allResult = handleMealPlans(weeklyPl[i],myMeals,myNutrients)
      }
    }
    else{
      allResult =  handleMealPlans(myPlan,myMeals,myNutrients)
    }
          const newMealPlan = new MealPlan({
            title,
            date,
            timeFrame,
            targetCalories,
            diet,
            exclude,
            day:{ meals:allResult[0],nutrients:allResult[1]},
            creator
          })
          let user
          console.log(newMealPlan)
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
          await  newMealPlan.save({session:sess})
          user.mealplans.push(newMealPlan)
          await user.save({session:sess})
          await sess.commitTransaction()
      }
      catch(err){
        console.log(err.message)
        const error = new HttpError('Created recipe failed, please create again ',500)
    
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
const getAllMeals = async (req,res,next) => {
  let mealPlans
  try{
     mealPlans = await MealPlan.find({}).exec()
     if(!mealPlans){
      const error = new HttpError('Could not find any mealplans',404)
      return next(error)
     }
  }
  catch(err){
    const error = new HttpError('Something went wrong, please try again',500)
    return next(error)
  }
  res.status(201).json({mealplans:mealPlans.map(mealplan => mealplan.toObject({getters:true}))})
}
const getMealPlanById = async (req, res, next) => {
  const mealPlanId = req.params.mid
  let existingMealPlan 
  try{
    existingMealPlan = await MealPlan.findById(mealPlanId).exec()
    if(!existingMealPlan){
      const error = new HttpError('Could not find any mealplan',404)
      return next(error)
    }
    res.status(201).json({mealplan:existingMealPlan.toObject({getters:true})})
  }
  catch(err){
    const error = new HttpError('Could not find any mealplan',404)
    return next(error)
  }
}
exports.createMealPlan = createMealPlan
exports.updateMealPlan  = updateMealPlan
exports.deleteMealPlan = deleteMealPlan
exports.getMealPlansByUserId = getMealPlansByUserId
exports.getAllMeals = getAllMeals
exports.getMealPlanById = getMealPlanById
