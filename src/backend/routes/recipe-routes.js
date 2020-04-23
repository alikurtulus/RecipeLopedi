const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const recipeController = require('../controllers/recipes')
const checkAuth = require('../middleware/check-auth')
const fileUpload = require('../middleware/file-upload')

router.get('/',recipeController.getAllRecipes)
router.get('/user/:uid',recipeController.getRecipesByUserId)
router.use(checkAuth)
router.post('/new',
 fileUpload.single('image'),
 [
  check('title').not().isEmpty(),
  check('ingredients').not().isEmpty(),
  check('instructions').not().isEmpty(),
  check('readyInMinutes').not().isEmpty(),
  check('servings').not().isEmpty(),
  check('price').not().isEmpty()
],recipeController.createRecipe)
router.put('/:rid',
  fileUpload.single('image'),
  [
  check('title').not().isEmpty(),
  check('ingredients').not().isEmpty(),
  check('instructions').not().isEmpty(),
  check('servings').not().isEmpty(),
  check('readyInMinutes').not().isEmpty(),
  check('instructions').not().isEmpty(),
  check('price').not().isEmpty()
],recipeController.updateRecipe)
router.delete('/:rid',recipeController.deleteRecipe)

module.exports = router
