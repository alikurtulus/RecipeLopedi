import React,{useState, useEffect} from 'react'
import {Form,Row,Col,Container,CardDeck} from 'react-bootstrap'
import CardBox from '../components/UIElements/CardBox'
import axios from 'axios'

const SecondHome = props => {
  const [recipe,setRecipe] = useState()
  let recipes = []

  const cuisines = ['African','American','British','Caribbean','Chinese',
                   'Eastern European','European','French','German','Greek','Indian',
                   'Irish','Italian','Japanese','Jewish','Korean','Latin American',
                   'Mediterranean','Mexican','Middle Eastern','Nordic','Spanish','Thai','Vietnamese']
      async function fetchCuisine(){

        try{
        
        }
        catch(err){
          console.log(err)
        }
      }
      useEffect(() => {
        fetchCuisine()
      })
  return (
    <Container>
      <Row>
         <CardDeck>
           {recipes.map(recipe=> <Col sm={3} > <CardBox /></Col>
           )}
         </CardDeck>
      </Row>
    </Container>
  )
}
export default SecondHome
