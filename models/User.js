const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Please provide a username',
    unique: 'That username is already registered'
  },
  email: {
    type: String,
    required: 'Please provide and email address',
    unique: 'That email is already registered'
  },
  password: {
    type: String,
    required: 'Please provide a password'
  },
  image: {
    type: String,
    required: 'Please provide a profile photo'
  }
}, {
  toJSON: {
    virtuals: true, // add virtals to the JSON
    // whenever the user is converted to JSON
    transform(doc, json) {
      delete json.password // delete the password
      delete json.__v
      return json
    }
  }
})

userSchema.virtual('events', {
  localField: '_id',
  foreignField: 'createdBy',
  ref: 'Event'
})

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(plaintext) {
    // `this` is the user being created
    // we're storing the plain text password here to use later
    this._passwordConfirmation = plaintext
  })

// LIFECYCLE HOOKS
userSchema.pre('validate', function checkPasswords(next) {
  // if the password has changed, and it doesn't match the password confirmation
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    // invalidate the passwordConfirmation field, so that validation fails
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }

  // ok, we're done here move on to the NEXT step (validation)
  next()
})

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    // if the password has changed, we need to hash it before storing it in the database
    // to do that we'll use `bcrypt` which is like dope as...
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }

  next()
})

// `methods` is like `prototype` for a constructor function
// this allows all user objects access to this `isPasswordValid` function
userSchema.methods.isPasswordValid = function isPasswordValid(plaintext) {
  // checks if the plain text password when hashed would equal
  // the hash in the data base
  return bcrypt.compareSync(plaintext, this.password)
}

userSchema.plugin(uniqueValidator) // this makes the unqiue error nicer...

module.exports = mongoose.model('User', userSchema)
