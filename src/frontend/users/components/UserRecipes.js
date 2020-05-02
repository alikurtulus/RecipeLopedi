import React,{useEffect,useState} from 'react'
import CardBox from '../../shared/components/UIElements/CardBox'
import {Row,Col,Container,CardDeck, Card, Spinner} from 'react-bootstrap'
import  {Link} from 'react-router-dom'
import  '../../recipes/components/UsersRecipes.css'

 const UserRecipes = props => {
    
    return (
        <div className='users-recipes-container'>
            <React.Fragment>
            {props.recipes.length === 0 && <Spinner animation="border" variant="primary" />}
            {props.recipes.length !== 0 &&
               <Container   className='cards-container'>
                    <Row>
                        <CardDeck>
                         {props.recipes.map(recipe => 
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
