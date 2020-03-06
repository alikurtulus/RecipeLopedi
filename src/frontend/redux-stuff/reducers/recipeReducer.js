import {FETCH_JOKE,FETCH_RANDOM_RECIPES} from '../actions/types'

const initialState = {
    joke:[],
    randomRecipes:[]
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
        default :
            return state
    }

}