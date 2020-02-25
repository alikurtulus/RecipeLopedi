const HttpError = require('../models/HttpError')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const Recipe = require('../models/MealPlan')
const User = require('../models/User')
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')


const createMealPlan = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors){
      const error = new HttpError('Invalid inputs passed, please check your data.',422)
      return next(error)
    }
    const {title, timeFrame, targetCalories, diet, exclude, meals} = req.body
}
