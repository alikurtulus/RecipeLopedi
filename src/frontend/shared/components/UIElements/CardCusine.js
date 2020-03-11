import React from 'react'
import {Card} from 'react-bootstrap'
import './CardCuisine.css'

 const CardCusine = props =>  {
    return (
    <Card border="secondary" style={{ width: '18rem' }} className='card-cuisine'>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
            <Card.Title  >{props.cuisine}</Card.Title>
        </Card.Body>
    </Card>
    )
}
export default CardCusine