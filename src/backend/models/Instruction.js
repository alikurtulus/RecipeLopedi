const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true);


const instructionSchema = new mongoose.Schema({
    content:{
      type:String,
      required:true
    }
})
instructionSchema.plugin(uniqueValidator)                                                //We plugin wiht mogooseValidator with our schema.
module.exports = mongoose.model('Instruction',instructionSchema)                          //We called User model with recipeSchema
