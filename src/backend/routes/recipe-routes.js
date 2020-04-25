const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const recipeController = require('../controllers/recipes')
const checkAuth = require('../middleware/check-auth')
const fileUpload = require('../middleware/file-upload')



router.get('/all',recipeController.getAllRecipes)
router.get('/user/:uid',recipeController.getRecipesByUserId)
router.get('/usersRecipes/details/:rid',recipeController.getRecipeById)

router.use(checkAuth)
router.post('/comment/recipe/:rid',recipeController.createComment)
router.post('/user/myfavouriteRecipe/:rid',recipeController.addFavouriteRecipe)
router.post('/user/usermyfavouriteRecipe/delete/:rid',recipeController.removeFavouriteRecipe)
router.post('/recipe/rating/:rid',recipeController.getRecipeRating)
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
