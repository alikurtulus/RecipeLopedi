import React  from 'react'
import {Card, Button,ListGroup,ListGroupItem } from  'react-bootstrap'
import './CardBox.css'
const CardBox = props => {
  let instructions = props.instructions.replace(/<[^>]+>/g, '')

  return (

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image}  />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>

        <ListGroup className="list-group-flush">
           <ListGroupItem><strong>Cooking Time:</strong> {props.readyInMinutes}</ListGroupItem>
           <ListGroupItem><strong>Servings:</strong> {props.servings}</ListGroupItem>
           <ListGroupItem><strong>PricePerServing:</strong> {props.price}</ListGroupItem>
         </ListGroup>
          <div className='more-btn'>
          <Button  variant="primary">See more..</Button>
          </div>
        </Card.Body>
       </Card>
     )
}
export default CardBox
