const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 280
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
const RecipeSchema = new mongoose.Schema({
   title:{
     type:String,
     required:true
   },
   rating:{
     type:Number

   },
   image:{
     type:String
   },
   content:{
     type:String,
     required:true
   },
   readyInMinutes:Number,
   diets:Array,
   glutenFree:Boolean,
   dairyFree:Boolean,
   vegan:Boolean,
   vegetarian:Boolean,
   ketogenic:Boolean,
   dishTypes:Array,
   ingredients:Array,
   comments:[commentSchema],
   modifiedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }

})

RecipeSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Recipe',RecipeSchema)
