import React from 'react'
import {Container,Image,Col,Row} from 'react-bootstrap'
import dietImage from '../../assets/diet-image.png'
import dietIcon from '../../assets/diet.png'
import './Home.css'
 const DietPage  = () => {
    return (
        <Container className='diet-page-container'>
            <Row>
                <Col sm={7}>
                    <Image className='illustration-image' src={dietImage} />
                </Col>
                <Col sm={5} className='diet-content'>
                  <Image src={dietIcon} className='hero-icon' />
                  <h3 className='middle-title'>Find your the right diet program</h3>
                  <p>
                      You can not lose weight in these days. You do not upset with that. We will figure out. We have a lot of diet programs in our website. Just pick the right one and start your losing weight journey.

                  </p>
                </Col>
            </Row>
        </Container>
    )
}
export default DietPage