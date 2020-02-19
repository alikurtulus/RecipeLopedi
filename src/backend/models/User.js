const mongoose = require('mongoose')                                            //We set up mongoose for creating schema
const uniqueValidator = require('mongoose-unique-validator')                    // We use validator for our schema
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  age:{
    type:Number,
    required:true,
  },
  image:{
    type:String,
    required:true
  },
  recipes:[{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'Recipe'
  }],
  mealplans:[{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'MealPlan'
  }],
  myFavouriteRecipes:[{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'Recipe'
  }]
})
userSchema.plugin(uniqueValidator)                                              //We plugin wiht mogooseValidator with our schema.
module.exports = mongoose.model('User',userSchema)                              //We called User model with userSchema
