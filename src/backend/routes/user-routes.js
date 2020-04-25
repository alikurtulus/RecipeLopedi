const express = require('express')
const {check} = require('express-validator')
const router = express.Router()
const usersController = require('../controllers/users')
const checkAuth = require('../middleware/check-auth')
const fileUpload = require('../middleware/file-upload')

router.post('/signUp',
  fileUpload.single('image'),
 [
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
router.use(checkAuth)
router.post('/user',usersController.getUserById)
router.get('/profile',usersController.profile)
module.exports = router
