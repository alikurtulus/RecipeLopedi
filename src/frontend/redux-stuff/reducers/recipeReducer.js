import {FETCH_JOKE,FETCH_RANDOM_RECIPES,FETCH_RECIPE_DETAILS_INFO} from '../actions/types'

const initialState = {
    joke:[],
    randomRecipes:[],
    recipeDetailsInfo:[]

}

export default function(state=initialState,action){

    switch(action.type){
        case FETCH_JOKE:
            return {
                ...state,
                joke:action.payload
            }
        case FETCH_RANDOM_RECIPES:
            return{
                ...state,
                randomRecipes:action.payload
            } 
        case FETCH_RECIPE_DETAILS_INFO:
            return{
                ...state,
                recipeDetailsInfo:action.payload
            }

        default :
            return state
    }

}