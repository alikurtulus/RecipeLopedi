import {FETCH_CUISINES,FETCH_RECIPE_DETAILS_INFO,FETCH_HERO_DATA,FETCH_USERS_RECIPES,FETCH_USERS_RECIPE_DETAILS_INFO} from '../actions/types'
import axios from 'axios'
import cuisines from '../../shared/lib/cuisines'



export const fetchCuisines = () => {

}
export const fetchHeroPage = () => async dispatch => {

    let urlOne =   `https://api.spoonacular.com/food/jokes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    let urlTwo =   `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&number=4`
  

    const requestOne = await  axios.get(urlOne);
    const requestTwo = await axios.get(urlTwo);
    

    await axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const joke = responses[0].data.text
        const randomRecipes = responses[1].data.recipes
     
        // use/access the results 
       
        const heroInfo = [joke,randomRecipes]
        dispatch({
            type:FETCH_HERO_DATA,
            payload:heroInfo
        })

      })).catch(errors => {
        // react on errors.
      })

}

export const fetchRecipeDetailsInfo = (id) => async dispatch => {
    let urlOne = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    let urlTwo = ` https://api.spoonacular.com/recipes/${id}/similar?number=10&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    let urThree = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`

    const requestOne = await  axios.get(urlOne);
    const requestTwo = await axios.get(urlTwo);
    const requestThree = await  axios.get(urThree);

    await axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
        const recipeDetails = responses[0].data
        const similarRecipes = responses[1].data
        const recipeNutrition = responses[2].data
        // use/access the results 
       
        const allDetails = [recipeDetails,similarRecipes,recipeNutrition]
        dispatch({
            type:FETCH_RECIPE_DETAILS_INFO,
            payload:allDetails
        })

      })).catch(errors => {
        // react on errors.
      })

}
export  const fetchUsersRecipes = () => async dispatch => {
    try{ 
       const responseData = await axios.get(`http://localhost:5000/api/recipes/all`);
        dispatch({
          type:FETCH_USERS_RECIPES,
          payload:responseData.data.recipes
        })
   }
   catch(err){

   }
   
}
export const fetchUsersRecipeDetails = (rid) => async dispatch => {
  try{
    const responseData = await axios.get(`http://localhost:5000/api/recipes/usersRecipes/details/${rid}`)
    console.log(responseData.data.recipe)
    dispatch({
      type:FETCH_USERS_RECIPE_DETAILS_INFO,
      payload:responseData.data.recipe
    })
  }
  catch(err){
    console.log(err)
  }
}