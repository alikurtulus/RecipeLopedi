import React from 'react'
import {Card} from 'react-bootstrap'
import './CardCuisine.css'

 const CardCuisine = props =>  {
    return (
    <Card border="secondary" style={{ width: '18rem' }} className='card-cuisine'>
        <Card.Img className='cuisine-image' variant="top" src={props.image} />
        <Card.Body className='cuisine-body'>
            <Card.Title  >{props.title}</Card.Title>
        </Card.Body>
    </Card>
    )
}
export default CardCuisine