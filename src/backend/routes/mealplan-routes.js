const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const mealController = require('../controllers/mealplans')
const checkAuth = require('../middleware/check-auth')

router.get('/user/:uid',mealController.getMealPlansByUserId)
router.use(checkAuth)
router.post('/new', mealController.createMealPlan)
router.put('/:mid',mealController.updateMealPlan)
router.delete('/:mid',mealController.deleteMealPlan)

module.exports = router
