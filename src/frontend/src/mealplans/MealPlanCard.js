import React from 'react'
import {Card,ListGroup,Button, Image} from 'react-bootstrap'
import './MealPlan.css'
import mealPlaIcon from '../assets/mealplan.png'
import calorieIcon from '../assets/cal.png'
import calendarIcon from '../assets/calendars.png'
import dietIcon from '../assets/diet.png'


const  MealPlanCard = props => {
    return (
        <React.Fragment>
            <Card  border="secondary" className='meal-plan-card' style={{ width: '18rem'}}>
                <Card.Body>
                <Card.Title className='meal-plan-title'> <span><Image className='mealplan-icon-title' src={mealPlaIcon} /></span> {props.title}</Card.Title>
                <ListGroup>
                        <ListGroup.Item>
                            <span><Image className='mealplan-icon' src={calorieIcon} /></span>
                            <strong>TargetCalories: </strong>{props.targetCalories}
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <span><Image className='mealplan-icon' src={dietIcon} /></span>
                            <strong>Diet: </strong>{props.diet}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span><Image className='mealplan-icon' src={calendarIcon} /></span>
                            <strong>TimeFrame: </strong>{props.timeFrame}
                        </ListGroup.Item>
                    </ListGroup>
                    <div className='more-btn'>
                    <Button className='btn-see-more' onClick={props.onSeeMore}>See more</Button>
                    </div>
                    
                </Card.Body>
            </Card>
        </React.Fragment>
      
    )
}
export default MealPlanCard