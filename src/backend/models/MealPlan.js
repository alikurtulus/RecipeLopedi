const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const MealPlan = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  timeFrame:{
    type:String,
    required:true
  },
  targetCalories:{
    type:Number,
    required:true
  },
  diet:{
    type:String,
    required:true
  },
  exclude:{
    type:String,
    required:true
  },
  recipes:{
    type:String,
    required:true
  },
  modifiedBy: {
   type: mongoose.Schema.ObjectId,
   ref: 'User'
 },
 createdBy: {
   type: mongoose.Schema.ObjectId,
   ref: 'User'
 }

})
