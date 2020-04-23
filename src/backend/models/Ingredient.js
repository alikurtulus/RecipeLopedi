const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true);

const ingredientSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    amount:{
      type:Number,
      required:true
    },
    measure:{
      type:String,
      required:true
    }
})
 
ingredientSchema.plugin(uniqueValidator)                                                //We plugin wiht mogooseValidator with our schema.
module.exports = mongoose.model('Ingredient',ingredientSchema)                          //We called User model with recipeSchema
