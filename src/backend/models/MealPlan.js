const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const mealPlanSchem = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  timeFrame:{
    type:String,
    required:true
  },
  targetCalories:{
    type:Number

  },
  diet:{
    type:String

  },
  exclude:{
    type:String

  },
  meals:[{
    day:{
      type:String,

    },
    recipes:[{
      type:{
        type:String,
        required:true
      },
      title:{
        type:String,
        required:true
      },
      readyInMinutes:{
        type:Number,
        required:true
      },
      image:{
        type:String,
        required:true
      },
      servings:{
        type:Number,
        required:true
      }
    }]

  }],

  creator:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'User'
  }


})
mealPlanSchem.plugin(uniqueValidator)                                            //We plugin wiht mogooseValidator with our schema.
module.exports = mongoose.model('MealPlan',mealPlanSchem)                        //We called User model with recipeSchema
