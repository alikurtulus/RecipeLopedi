import React,{useState,useEffect} from 'react'
import {Container,CardDeck,Row,Col} from 'react-bootstrap'
import MealPlanCard from './MealPlanCard'
import {useHistory} from 'react-router-dom'
const  MealPlanList = props => {
    const history = useHistory()
    const handleSeeMore = (mid,timeFrame) => {
      history.push(`/mealplan/details/${mid}`,{timeFrame:timeFrame})
    }
    return (
        <Container>
            <CardDeck>
                {props.mplans.map(mp => 
                    <>
                          <Col sm={3}>
                              <MealPlanCard
                                title={mp.title}
                                timeFrame={mp.timeFrame}
                                targetCalories={mp.targetCalories}
                                diet={mp.diet}
                                onSeeMore={ () => handleSeeMore(mp.id,mp.timeFrame)}
                              />
                          </Col>
                    </>
                )}
            </CardDeck>
        </Container>
    ) 
}
export default MealPlanList