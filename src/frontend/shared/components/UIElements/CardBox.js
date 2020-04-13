import React  from 'react'
import {Card, Button,ListGroup,ListGroupItem } from  'react-bootstrap'
import './CardBox.css'
import  {Link} from 'react-router-dom'
const CardBox = props => {
    let url
    console.log(props.cid)
    if(props.cid === undefined){

      url= { pathname:`recipe/details/${props.id}` }
    }
    else {
      url = {
        pathname:`recipe/${props.rid}`,
        state:{cuisineId:props.cid}}
    }
 
  return (

    <Card border="secondary" style={{ width: '18rem'}}>
      <Card.Img variant="top" src={props.image}  />
        <Card.Body>
          <Card.Title className='title-text'>{props.title}</Card.Title>
              <ListGroup className="list-group-flush details">
                <ListGroupItem><strong>ReadyInMinutes:</strong> {props.readyInMinutes}</ListGroupItem>
                <ListGroupItem><strong>Servings:</strong> {props.servings}</ListGroupItem>
              </ListGroup>
          <div className='more-btn'>
          <Link  to={url}>
            <Button  variant="primary"
                >See more..
            </Button>
          </Link>
          </div>
        </Card.Body>
       </Card>
     )
}
export default CardBox
