const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true);

const nutrientSchema = new mongoose.Schema({
    calories:{
      type:Number,
      required:true
    },
    carbohydrates:{
      type:Number,
      required:true
    },
    fat:{
      type:Number,
      required:true
    },
    protein:{
        type:Number,
        required:true
    }
  })
 
nutrientSchema.plugin(uniqueValidator)                                                //We plugin wiht mogooseValidator with our schema.
module.exports = mongoose.model('Nutrient',nutrientSchema)                          //We called User model with recipeSchema
