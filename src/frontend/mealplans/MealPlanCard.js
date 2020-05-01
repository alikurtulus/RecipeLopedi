import React from 'react'
import {Card,ListGroup,Button} from 'react-bootstrap'
import './MealPlan.css'
const  MealPlanCard = props => {
    return (
        <React.Fragment>
            <Card  border="secondary" className='meal-plan-card' style={{ width: '18rem'}}>
                <Card.Body>
                <Card.Title className='meal-plan-title'>{props.title}</Card.Title>
                <ListGroup>
                        <ListGroup.Item><strong>TargetCalories: </strong>{props.targetCalories}</ListGroup.Item>
                        <ListGroup.Item><strong>Diet: </strong>{props.diet}</ListGroup.Item>
                        <ListGroup.Item><strong>TimeFrame: </strong>{props.timeFrame}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary" onClick={props.onSeeMore}>See more</Button>
                </Card.Body>
            </Card>
        </React.Fragment>
      
    )
}
export default MealPlanCard