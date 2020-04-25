import React  from 'react'
import {Card, Button,ListGroup,ListGroupItem } from  'react-bootstrap'
import './CardBox.css'
import  {Link} from 'react-router-dom'

const CardBox = props => {
    let url
    let imageUrl
    console.log(props.uId)
    if(props.uId){
      imageUrl = `http://localhost:5000/${props.image}`
    }
    else{
      imageUrl = props.image
    }
    
    if(props.cid){
      url = {
        pathname:`recipe/${props.rid}`,
        state:{cuisineId:props.cid}}
    }
    else if(props.uId){
      url = {pathname:`usersRecipes/details/${props.uId}`}
    }
    else { 
      url= { pathname:`recipe/details/${props.id}` }
    }
    console.log(url)
 
  return (

    <Card border="secondary" style={{ width: '18rem'}}>
      <Card.Img variant="top" className='card-image' src={props.mySimilar === 'similar'  ?  `https://spoonacular.com/recipeImages/${imageUrl}` : imageUrl}  />
        <Card.Body className='card-body'>
          <Card.Title className='title-text'>{props.title}</Card.Title>
              <ListGroup className="list-group-flush details">
                <ListGroupItem><strong>ReadyInMinutes:</strong> {props.readyInMinutes}</ListGroupItem>
                <ListGroupItem><strong>Servings:</strong> {props.servings}</ListGroupItem>
              </ListGroup>
          <div className='more-btn'>
          <Link  to={url}>
            <Button  variant="primary" className='more-btn'
                >See more..
            </Button>
          </Link>
          </div>
        </Card.Body>
  </Card>
     )
}
export default CardBox
