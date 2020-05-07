import {FETCH_RECIPE_DETAILS_INFO,FETCH_HERO_DATA,FETCH_USERS_RECIPES,FETCH_USERS_RECIPE_DETAILS_INFO} from '../actions/types'

const initialState = {
    joke:[],
    randomRecipes:[],
    recipeDetailsInfo:[],
    heroInfo:[],
    usersRecipes:[],
    usersRecipeDetailsInfo:[]

}

export default function(state=initialState,action){

    switch(action.type){
      
        case FETCH_RECIPE_DETAILS_INFO:
            return{
                ...state,
                recipeDetailsInfo:action.payload
            }
        case FETCH_HERO_DATA:
            return{
                ...state,
                heroInfo:action.payload
            }    
        case FETCH_USERS_RECIPES:
            return{
                ...state,
                usersRecipes:action.payload
            }
        case FETCH_USERS_RECIPE_DETAILS_INFO:
            return{
                ...state,
                usersRecipeDetailsInfo:action.payload
            }            

        default :
            return state
    }

}