import {FETCH_RECIPE_DETAILS_INFO,FETCH_HERO_DATA} from '../actions/types'

const initialState = {
    joke:[],
    randomRecipes:[],
    recipeDetailsInfo:[],
    heroInfo:[]

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

        default :
            return state
    }

}