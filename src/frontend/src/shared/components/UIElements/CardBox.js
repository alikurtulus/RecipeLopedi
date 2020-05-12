import React,{useEffect, useState,useContext}  from 'react'
import {Card, Button,ListGroup,ListGroupItem,Image } from  'react-bootstrap'
import './CardBox.css'
import {useHistory} from 'react-router-dom'
import clockIcon from '../../../assets/clock.png'
import servedIcon from '../../../assets/served.png'
import {AuthContext} from '../../../shared/context/auth-context'

const CardBox = props => {
    const [url,setUrl] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    let history = useHistory()
    const auth  = useContext(AuthContext)
    useEffect(() => {
      if(props.uId){
        if(auth.userId){
          setImageUrl(process.env.REACT_APP_ASSET_URL +`/${props.image}`)
          setUrl({pathname:`/recipes/usersRecipes/details/${props.uId}`,
          state:{crud:props.crud,creator:props.creator}
        }) 
        }
        else{
          setImageUrl(process.env.REACT_APP_ASSET_URL +`/${props.image}`)
          setUrl({pathname:`/recipes/usersRecipes/details/${props.uId}`})

        }
      
      }
      else if(props.cid){
        setUrl({
          pathname:`/cuisines/recipe/${props.rid}`,
          state:{cuisineId:props.cid}}) 
          setImageUrl(props.image)
      }
     
      else if(props.id) { 
        setUrl({ pathname:`/recipe/details/${props.id}` })
        setImageUrl(props.image)
      }
  
    },[])


    const handleSeeMore = async (e) => {
      e.preventDefault()
     
      history.push(url)
    }
  
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
            <Button   variant="primary" className='more-btn' onClick={handleSeeMore}
                >See more..
            </Button>
          </div>
        </Card.Body>
  </Card>
     )
}
export default CardBox
