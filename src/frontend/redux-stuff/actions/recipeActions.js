import {FETCH_JOKE,FETCH_RANDOM_RECIPES,FETCH_CUISINES,FETCH_RECIPE_DETAILS_INFO} from '../actions/types'
import axios from 'axios'
import cuisines from '../../shared/lib/cuisines'


export const fetchJoke =  () => async dispatch => {
    
    const responseData = await axios.get(`https://api.spoonacular.com/food/jokes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
        dispatch({
        type:FETCH_JOKE,
        payload:responseData.data.text
    })
    console.log(responseData.data)

}
export const fetchRandomRecipes =  () => async dispatch => {

const responseData = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=4`)
    dispatch({
    type:FETCH_RANDOM_RECIPES,
    payload:responseData.data.recipes
})
   console.log(responseData.data)
}
export const fetchCuisines = () => {

}


export const fetchRecipeDetailsInfo = (id) => async dispatch => {
    let urlOne = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    let urlTwo = ` https://api.spoonacular.com/recipes/${id}/similar?number=4&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    let urThree = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`

    const requestOne = await  axios.get(urlOne);
    const requestTwo = await axios.get(urlTwo);
    const requestThree = await  axios.get(urThree);

    await axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
        const recipeDetails = responses[0].data
        const similarRecipes = responses[1].data
        const recipeNutrition = responses[2].data
        // use/access the results 
        console.log(recipeDetails)
        console.log(similarRecipes)
        console.log(recipeNutrition)
        const allDetails = [recipeDetails,similarRecipes,recipeNutrition]
        dispatch({
            type:FETCH_RECIPE_DETAILS_INFO,
            payload:allDetails
        })

      })).catch(errors => {
        // react on errors.
      })

}