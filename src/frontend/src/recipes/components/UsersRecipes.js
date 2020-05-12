import React,{useEffect,useState} from 'react'
import CardBox from '../../shared/components/UIElements/CardBox'
import {Row,Col,Container,CardDeck, Card, Spinner,Image} from 'react-bootstrap'
import { useSelector, useDispatch}  from 'react-redux'
import {fetchUsersRecipes} from '../../redux-stuff/actions/recipeActions'
import  {Link} from 'react-router-dom'
import './UsersRecipes.css'


 const UserRecipes = () => {
     const dispatch = useDispatch()
     
     useEffect(() => {
        const fetchData = async () => {
            await  dispatch(fetchUsersRecipes())  
          }
          fetchData()
     },[dispatch])
     const recipes = useSelector(state => state.recipes.usersRecipes)
    return (    
            <React.Fragment>
            {recipes.length === 0 &&  <Spinner animation="border" variant="primary" /> }
            {recipes.length !== 0 &&
               <Container   className='cards-container'>
                    <CardDeck>
                        {recipes.map((recipe,index) => 
                           <Row>
                             <Col sm={4} key={recipe.id} className='recipe-card'>
                                    <CardBox 
                                    title={recipe.title}
                                    readyInMinutes={recipe.readyInMinutes}
                                    image={recipe.image}
                                    price={recipe.price}
                                    servings={recipe.servings}
                                    uId={recipe.id}
                                    />          
                                </Col>   
                           </Row>
                                  
                        )}
                      
                    </CardDeck>
                
               </Container>
            }
            </React.Fragment>
       
    )
}
export default UserRecipes
