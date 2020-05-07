import React  from 'react'
import {Card, Button,ListGroup,ListGroupItem,Image } from  'react-bootstrap'
import './CardBox.css'
import  {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import clockIcon from '../../../images/clock.png'
import servedIcon from '../../../images/served.png'

const CardBox = props => {
    let url
    let history = useHistory()
    let imageUrl
   
    if(props.uId){
      imageUrl = process.env.REACT_APP_ASSET_URL +`/${props.image}`
      url = {pathname:`/recipes/usersRecipes/details/${props.uId}`,
             state:{crud:props.crud,creator:props.creator}
           }
    }
    else if(props.cid){
      url = {
        pathname:`recipe/${props.rid}`,
        state:{cuisineId:props.cid}}
        imageUrl = props.image
    }
   
    else if(props.id) { 
      url= { pathname:`recipe/details/${props.id}` }
      imageUrl = props.image
    }
    const handleSeeMore = e => {
      e.preventDefault()
      history.push(url,{crud:props.crud})
    }
    console.log(url)
 
  return (

    <Card border="secondary" style={{ width: '18rem'}}>
      <Card.Img variant="top" className='card-image' src={props.mySimilar === 'similar'  ?  `https://spoonacular.com/recipeImages/${imageUrl}` : imageUrl}  />
        <Card.Body className='card-body'>
          <Card.Title className='title-text'>{props.title}</Card.Title>
              <ListGroup className="list-group-flush details">
                <ListGroupItem>
                  <span ><Image className='clock-icon' src={clockIcon} /></span>
                  <strong>ReadyInMinutes:</strong> {props.readyInMinutes}
                </ListGroupItem>
                <ListGroupItem>
                  <span><Image className='served-icon' src={servedIcon} /></span>
                  <strong>Servings:</strong> {props.servings}
                </ListGroupItem>
              </ListGroup>
          <div className='more-btn'>
            <Button  variant="primary" className='more-btn' onClick={handleSeeMore}
                >See more..
            </Button>
          </div>
        </Card.Body>
  </Card>
     )
}
export default CardBox
