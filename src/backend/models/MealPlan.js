const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mealSchema = require("./Meal").schema;
const nutrientSchema = require("./Nutrient").schema;

const mealPlanSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    required:true
   
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
    type:String
  },
  day:{
    meals:[mealSchema],
    nutrients:[nutrientSchema]
  },
  creator:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'User'
  }
})
mealPlanSchema.plugin(uniqueValidator)                                            //We plugin wiht mogooseValidator with our schema.
module.exports = mongoose.model('MealPlan',mealPlanSchema)                        //We called User model with recipeSchema
