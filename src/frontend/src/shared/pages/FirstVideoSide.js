import React from 'react'
import cucemberVideo from '../../assets/TheCucumber.mp4'
import  cucumberIcon from '../../assets/cucumber.png'
import './Home.css'
import {Container,Image,Col,Row,ResponsiveEmbed,embed } from 'react-bootstrap'
const FirstVideoSide = () => {
    return (
        <Container className='diet-page-container'>
            <Row>
                <Col sm={6} className='diet-content'>
                  <Image className='hero-icon' src={cucumberIcon} />
                  <h3 className='middle-title'>Make your vegetarian meal </h3>
                    <p>
                        If you find difficult to find the vegetarian recipe for yourself. Do not be confused with that. We will help you for vegetarian meals.
                        We have a lot of recipes for vegetarians
                    </p>
                </Col>
                <Col sm={6} >
                    <div className='video-container'>
                        <ResponsiveEmbed aspectRatio="16by9" >
                          <video  loop autoPlay >
                            <source src={ cucemberVideo } type="video/mp4" />
                         </video>
                        </ResponsiveEmbed>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default FirstVideoSide