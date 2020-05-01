const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const mealController = require('../controllers/mealplans')
const checkAuth = require('../middleware/check-auth')

router.get('/all',mealController.getAllMeals)
router.get('/meal/:mid',mealController.getMealPlanById)
router.get('/user/:uid',mealController.getMealPlansByUserId)
router.use(checkAuth)
router.post('/new',
[
 check('title').not().isEmpty(),
 check('timeFrame').not().isEmpty(),
 check('diet').not().isEmpty(),
 check('targetCalories').not().isEmpty(),
 check('date').not().isEmpty()
], 
mealController.createMealPlan)
router.put('/:mid',mealController.updateMealPlan)
router.delete('/:mid',mealController.deleteMealPlan)

module.exports = router
