import React,{useEffect,useState} from 'react'
import { useParams, useLocation} from "react-router";
import axios from 'axios';
import {Container,Col,Card,Row,Spinner,ListGroup} from 'react-bootstrap'
import WeeklyPlan from './WeeklyPlan'
import DailyPlan from './DailyPlan'
import './MealPlanDetails.css'

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
                    <h3>{mealPlan.title}</h3>
                    <Row className='details-card-row'>
                        <div>  
                            <p><strong>Target Calories: </strong>{mealPlan.targetCalories}</p>
                            <p><strong>TimeFrame: </strong>{mealPlan.timeFrame}</p>
                            <p><strong>Excludes: </strong>{mealPlan.exclude === '' ? '-' : mealPlan.exclude} </p>
                        </div>
                        <div >
                            <p><strong>Date: </strong>{mealPlan.date.substring(0, 10)}</p>
                            <p><strong>Date: </strong>{mealPlan.diet} </p>
                           
                        </div>
                    </Row>
                    <hr/>
                    <Row className='meal-plans'>
                        {mealPlan.timeFrame === 'Day' &&  (<DailyPlan data={mealPlan.day} />)}
                        {mealPlan.timeFrame === 'Week' && (<WeeklyPlan data={mealPlan.day} />) }
                    </Row>
                 </Card>
             </Container> 
            ) 
            }
           
        </React.Fragment>
       
    )
}
export default MealPlanDetails