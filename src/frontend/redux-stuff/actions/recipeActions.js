import {FETCH_JOKE,FETCH_RANDOM_RECIPES,FETCH_CUISINES} from '../actions/types'
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