const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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
    type:String

  },
  exclude:{
    type:String

  },
  day:{
    type:String,
    require:true,
    meals:[{
        title:{
          type:String,
          required:true
        },
        readyInMinutes:{
          type:Number,
          required:true
        },
        sourceUrl:{
          type:String,
          required:true
        },
        servings:{
          type:Number,
          required:true
        }
    }],
    nutrients:{
      calories:{
        type:Number,
        required:true
      },
      protein:{
        type:Number,
        required:true
      },
      fat:{
        type:Number,
        required:true
      },
      carbohydrates:{
        type:Number,
        required:true
      }
    }

  },
  creator:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'User'
  }


})
mealPlanSchema.plugin(uniqueValidator)                                            //We plugin wiht mogooseValidator with our schema.
module.exports = mongoose.model('MealPlan',mealPlanSchema)                        //We called User model with recipeSchema
