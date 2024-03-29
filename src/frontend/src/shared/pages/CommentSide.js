import React from 'react'
import {Container,Image,Col,Row} from 'react-bootstrap'
import feedBackImage from '../../assets/feedback.png'
import commentIcon from '../../assets/comment.png'
import './Home.css'
 const CommentSide  = () => {
    return (
        <Container className='diet-page-container'>
            <Row>
               
                <Col sm={7} >
                  <Image className='illustration-image' src={feedBackImage} />
                </Col>
                <Col sm={5} className='diet-content'>
                <Image src={commentIcon} className='hero-icon' />
                  <h3 className='middle-title'>See your feedbacks </h3>
                  <p>
                     Sometimes, You want to see other people's reactions about your recipe and get more attention what you made.
                     Do not worry about that. We will find the way that people can leave feedback for your recipe. You can improve your recipe more...
                  </p>
                </Col>
            </Row>
        </Container>
    )
}
export default CommentSide