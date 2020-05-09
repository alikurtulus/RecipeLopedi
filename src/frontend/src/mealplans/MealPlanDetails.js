import React,{useEffect,useState} from 'react'
import { useParams, useLocation} from "react-router";
import axios from 'axios';
import {Container,Col,Card,Row,Spinner,ListGroup, Image} from 'react-bootstrap'
import WeeklyPlan from './WeeklyPlan'
import DailyPlan from './DailyPlan'
import './MealPlanDetails.css'
import calorieIcon from '../assets/cal.png'
import calendarIcon from '../assets/calendars.png'
import excludeIcon from '../assets/forbidden.png'
import mealPlaIcon from '../assets/mealplan.png'
import dietIcon from '../assets/diet.png'
import dateIcon from '../assets/age.png'

const  MealPlanDetails = props => {
    const {mid} = useParams()
    let location = useLocation()
    const [mealPlan,setMealPlan] = useState()
    
    useEffect(() => {
        const fetchData = async () => {
            const responseData = await axios.get(process.env.REACT_APP_BACKEND_URL +`/mealplans/meal/${mid}`)
            console.log(responseData.data)
            setMealPlan(responseData.data.mealplan)
        }
        fetchData()
    },[])
    
    return (
        <React.Fragment>
            {mealPlan === undefined && <Spinner animation="border" role="status"> <span className="sr-only">Loading...</span></Spinner>}
            {mealPlan !== undefined && (
             <Container className='details-container'>
                 <Card border='secondary' className='details-card'>
                     <div  className='details-card-row-title'>
                         <div><span><Image className='mealplan-detail-icon-title' src={mealPlaIcon} /></span></div><div><h3>{mealPlan.title}</h3></div>
                     </div>
                    <div className='details-card-row'>
                        <div>  
                            <p>
                                <span><Image className='mealplan-detail-icon' src={calorieIcon} /></span>
                                <strong>Target Calories:</strong>{mealPlan.targetCalories}
                            </p>
                            <p>
                                <span><Image className='mealplan-detail-icon' src={calendarIcon} /></span>
                                <strong>TimeFrame: </strong>{mealPlan.timeFrame}
                            </p>
                            <p>
                                <span><Image className='mealplan-detail-icon' src={excludeIcon} /></span>
                                <strong>Excludes: </strong>
                                {mealPlan.exclude === '' ? '-' : mealPlan.exclude} </p>
                        </div>
                        <div >
                            <p>
                                <span><Image className='mealplan-detail-icon' src={dateIcon} /></span>
                                <strong>Date: </strong>{mealPlan.date.substring(0, 10)}
                            </p>
                            <p>
                                <span><Image className='mealplan-detail-icon' src={dietIcon} /></span>
                                <strong>Diet: </strong>{mealPlan.diet}
                            </p>
                           
                        </div>
                    </div>
                    <hr/>
                    <div className='meal-plans'>
                        {mealPlan.timeFrame === 'Day' &&  (<DailyPlan data={mealPlan.day} />)}
                        {mealPlan.timeFrame === 'Week' && (<WeeklyPlan data={mealPlan.day} />) }
                    </div>
                 </Card>
             </Container> 
            ) 
            }
           
        </React.Fragment>
       
    )
}
export default MealPlanDetails