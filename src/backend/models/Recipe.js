const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true);
const ingredientSchema = require("./Ingredient").schema;
const instructionSchema = require("./Instruction").schema;


const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxLength: 280
  }
}, {
  timestamps: true, // this adds `createdAt` and `updatedAt` properties
  toJSON: {
    // whenever the comment is converted to JSON
    transform(doc, json) {
      delete json.__v
      return json
    }
  }
})


const recipeSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  ingredients:[ingredientSchema],
  instructions:[instructionSchema],
  readyInMinutes:{
    type:Number,
    required:true
  },
  servings:{
    type:Number,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  creator:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'User'
  },
  ratings:[{
    point:{
      type:Number,
      required:true
    }
  }],
  comments:[commentSchema],
  nutrients:[{
    name:{
      type:String,
      required:true
    },
    amount:{
      type:Number,
      required:true
    }
  }],
 


})
recipeSchema.plugin(uniqueValidator)                                            //We plugin wiht mogooseValidator with our schema.
module.exports = mongoose.model('Recipe',recipeSchema)                          //We called User model with recipeSchema

