import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch}  from 'react-redux'
import {Form,Container,Button,Row, Col,CardDeck} from 'react-bootstrap'
import axios from 'axios'
import CardBox from '../components/UIElements/CardBox'
import {fetchJoke,fetchRandomRecipes} from '../../redux-stuff/actions/recipeActions'
import {Spinner} from 'react-bootstrap'
const Hero = props => {
  
 const dispatch = useDispatch()
   useEffect(() =>{
     dispatch(fetchJoke())
     dispatch(fetchRandomRecipes())
   } ,[dispatch])
   const joke  = useSelector(state => state.recipes.joke)
   const randomRecipes = useSelector(state => state.recipes.randomRecipes)
   
   console.log(joke)
   console.log(randomRecipes)
 return (

   <React.Fragment >
   {joke.length === 0 && randomRecipes.length === 0 &&  <Spinner animation="border" variant="primary" />}
   {joke.length !== 0 && randomRecipes.length !== 0 &&  <div className='main-container'>
   <Container>
    <h2>RecipeLopedi</h2>

    <Form>
    <Row className="justify-content-md-center">
    <Col sm={10}><Form.Control size="lg" type="text" placeholder="Search any recipe..." /></Col>
    <Col sm={2}><Button type="submit" size="lg" block>Search </Button></Col>
    </Row>
    <Form.Text className="text-muted center" size='lg'>
      {joke}
    </Form.Text>

    </Form>
   </Container>
   <Container className='cards-container'>
      <Row>
      <CardDeck>
      {randomRecipes.map(recipe =>
      <Col sm={3} key={recipe.id}>

        <CardBox
            
             price={recipe.pricePerServing}
             image={recipe.image}
             servings={recipe.servings}
             title={recipe.title}
             readyInMinutes={recipe.readyInMinutes}
             instructions={recipe.instructions} />
      </Col> )}
      </CardDeck>

      </Row>
    </Container>
   </div>
}
  
   </React.Fragment>

 )
}
export default Hero
