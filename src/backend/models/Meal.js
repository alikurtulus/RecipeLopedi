const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true);

const mealSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    readyInMinutes:{
      type:Number,
      required:true
    },
    servings:{
      type:Number,
      required:true
    },
    sourceUrl:{
      type:String,
      required:true
    }
})
 
mealSchema.plugin(uniqueValidator)                                                //We plugin wiht mogooseValidator with our schema.
module.exports = mongoose.model('Meal',mealSchema)                          //We called User model with recipeSchema
