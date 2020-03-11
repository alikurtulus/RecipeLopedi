import React  from 'react'
import {Card, Button,ListGroup,ListGroupItem } from  'react-bootstrap'
import './CardBox.css'
import  {Link} from 'react-router-dom'
const CardBox = props => {
  


  return (

    <Card border="secondary" style={{ width: '18rem'}}>
      <Card.Img variant="top" src={props.image}  />
        <Card.Body>
          <Card.Title className='title-text'>{props.title}</Card.Title>

        <ListGroup className="list-group-flush details">
           <ListGroupItem><strong>ReadyInMinutes:</strong> {props.readyInMinutes}</ListGroupItem>
           <ListGroupItem><strong>Servings:</strong> {props.servings}</ListGroupItem>
           <ListGroupItem><strong>PricePerServing:</strong> {props.price}</ListGroupItem>
         </ListGroup>
          <div className='more-btn'>
          <Link  to={{
            pathname:`recipe/${props.rid}`,
            state:{cuisineId:props.cid}}}
          ><Button  variant="primary">See more..</Button></Link>
          </div>
        </Card.Body>
       </Card>
     )
}
export default CardBox
