import React,{useEffect,useState} from 'react'
import { useParams, useLocation} from "react-router";
import {Row,Col,Container,CardDeck, Card, Spinner} from 'react-bootstrap'
import CardBox from '../../shared/components/UIElements/CardBox'
import CardCuisine from '../../shared/components/UIElements/CardCuisine'
import {Link} from 'react-router-dom'

const  RecipeSearches = () => {
    let location = useLocation()
    let recipes = location.state.data
 
     const imageUrl = `https://spoonacular.com/recipeImages/`
    return (
        <div >
            <React.Fragment>
                {recipes.length === 0 && <Spinner animation="border" variant="primary" /> }
                {recipes.length !== 0 &&
                
                    <Container>
                        <Row>
                            <CardDeck>
                             
                                {recipes.map(recipe => 
                                    <Col sm={3} key={recipe.id} >
                                           
                                     <Link to={`/recipe/details/${recipe.id}`}><CardCuisine title={recipe.title}   image={recipe.image} /></Link>           
                                         
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
export default RecipeSearches