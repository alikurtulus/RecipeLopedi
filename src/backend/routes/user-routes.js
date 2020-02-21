const express = require('express')
const {check} = require('express-validator')
const router = express.Router()
const usersController = require('../controllers/users')

router.post('/signUp', [
  check('username').not().isEmpty(),
  check('age').not().isEmpty(),
  check('gender').not().isEmpty(),
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({min:6})
],usersController.signUp)
router.post('/login',[
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({min:6})
],usersController.login)
module.exports = router
