import React,{useState,useEffect} from 'react'
import {Container,CardDeck,Row,Col} from 'react-bootstrap'
import MealPlanCard from './MealPlanCard'
import {useHistory} from 'react-router-dom'
import './MealPlan.css'
const  MealPlanList = props => {
    const history = useHistory()
    console.log(props.crud)
    console.log(props.mplans)
    const handleSeeMore = (mid,timeFrame) => {
      history.push(`/mealplan/details/${mid}`,{timeFrame:timeFrame})
    }
    return (
        <Container>
            <CardDeck className='mealplan-card-deck'>
                    {props.mplans.map(mp => 
                         <Row>
                              <Col sm={3}>
                              <MealPlanCard
                                title={mp.title}
                                timeFrame={mp.timeFrame}
                                targetCalories={mp.targetCalories}
                                diet={mp.diet}
                                onSeeMore={ () => handleSeeMore(mp.id,mp.timeFrame)}
                              />
                          </Col>
                         </Row>
                   
                )}
                
            </CardDeck>
           
        </Container>
    ) 
}
export default MealPlanList