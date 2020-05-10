import React,{useEffect,useState} from 'react'
import CardBox from '../../shared/components/UIElements/CardBox'
import {Row,Col,Container,CardDeck, Card, Spinner,Image} from 'react-bootstrap'
import { useSelector, useDispatch}  from 'react-redux'
import {fetchUsersRecipes} from '../../redux-stuff/actions/recipeActions'
import  {Link} from 'react-router-dom'
import './UsersRecipes.css'
import NotFoundIcon from '../../assets/notfoundfood.png'

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
        <div className='users-recipes-container'>
            
            <React.Fragment>
            {recipes.length === 0 && 
            
            <Container className='not-found-container'>
                <div><h2 className='not-found-title'>Recipes Not Found Yet...</h2></div>
                <Image src={NotFoundIcon} className='not-found-food-icon' />
            </Container>
            }
            {recipes.length !== 0 &&
               <Container   className='cards-container'>
                    <Row>
                        <CardDeck>
                         {recipes.map(recipe => 
                                    <Col sm={3} key={recipe.id} className='recipe-card'>
                                        <CardBox 
                                           title={recipe.title}
                                           readyInMinutes={recipe.readyInMinutes}
                                           image={recipe.image}
                                           price={recipe.price}
                                           servings={recipe.servings}
                                           uId={recipe.id}
                                        />          
                                    </Col>       
                         )}
                        </CardDeck>
                    </Row>
               </Container>
            }
            </React.Fragment>
        </div>
    )
}
export default UserRecipes
