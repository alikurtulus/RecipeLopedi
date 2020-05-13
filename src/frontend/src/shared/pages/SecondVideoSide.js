import React from 'react'
import fishVideo from '../../assets/bakedFish.mp4'
import fishIcon from '../../assets/fish.png'
import './Home.css'
import {Container,Image,Col,Row,ResponsiveEmbed,embed } from 'react-bootstrap'
const FirstVideoSide = () => {
    return (
        <Container className='diet-page-container'>
            <Row>
                <Col sm={6} className='diet-content'>
                  <Image src={fishIcon} className='hero-icon' />
                  <h3 className='middle-title'>Make your Sea foods </h3>
                  <p>
                     If you find difficult to find your sea food recipes. Do not be confused with that. We will help you to find your delicious sea food recipes. 
                     You will enjoy it when you make it.
                  </p>
                </Col>
                <Col sm={6} >
                    <div className='video-container' >
                        <ResponsiveEmbed aspectRatio="16by9" >
                          <video  loop autoPlay >
                            <source src={ fishVideo } type="video/mp4" />
                         </video>
                        </ResponsiveEmbed>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default FirstVideoSide