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
const recipeSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  ingredients:[{
    name:{
      type:String,
      required:true
    },
    image:{
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
  }],
  instructions:[{
    content:{
      type:String,
      required:true
    }
  }],
  readyInMinutes:{
    type:Number,
    required:true
  },
  servings:{
    type:String,
    required:true
  },
  ratings:[{
    point:{
      type:Number,
      required:true
    }
  }],
  creator:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:'User'
  },
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
  price:{
    type:Number,
    required:true
  }


})
