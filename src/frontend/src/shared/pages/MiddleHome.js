import React from 'react'
import {Container,Row,Col,Image} from 'react-bootstrap'
import recipeIcon from '../../images/mealplan.png'
import mealPlanIcon from '../../images/calendars.png'
import './Home.css'

 const MiddleHome = () => {
    return (
        <Container className='middle-home-container'>
            <Row>
                <Col sm={6}>
                    <div>
                        <div><Image className='hero-icon' src={mealPlanIcon} /><h3 className='middle-title'>Make your meal plan</h3></div> 
                        <p>
                            You can make your meal plan daily or weekly.
                            You can use your target calories, diet program and intolerance food to make your meal plan more useful.
                            Save your time with this mealplanner and spend your time with your friends and family more...
                        </p>
                    </div>
                </Col>
                <Col sm={6}>
                    <div>
                        <div><Image className='hero-icon' src={recipeIcon} /><h3 className='middle-title'>Find your recipe</h3></div>
                        <p>
                            We have 5,000 recipes for you. You can choose your favourite recipe and make anytime.
                            You do not need to think what i can make for the meal and we already think that for you.
                            Save your time with this  and spend your time with your friends and family more...
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default MiddleHome