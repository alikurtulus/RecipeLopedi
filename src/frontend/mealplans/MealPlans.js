import React,{useEffect,useState} from 'react'
import axios from 'axios'
import MealPlanList from './MealPlanList'
import './MealPlan.css'

const MealPlans = props => {
    const [mealPlans,setMealPlans] = useState()
    useEffect(() => {
       const fetchMealPlans = async () => {
           const responseData = await axios.get(process.env.REACT_APP_BACKEND_URL + '/mealplans/all')
        setMealPlans(responseData.data.mealplans)
        console.log(responseData)
       }
       fetchMealPlans()
    },[])
    return (
        <>
        {mealPlans === undefined && <div></div>}
        {mealPlans !== undefined && (
            <div className='mealplan-container'>
               <MealPlanList mplans={props.myMealPlans !== undefined ? props.myMealPlans : mealPlans}/> 
            </div>
        )}
       </>
    )
}
export default MealPlans