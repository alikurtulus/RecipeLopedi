import React,{useState,useEffect} from 'react'
import {Form,Row,Col,Container,CardDeck} from 'react-bootstrap'
import cuisines from '../lib/cuisines'
import { useParams} from "react-router"
import CardBox from '../components/UIElements/CardBox'
import {Spinner} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CuisineRecipes.css'
import NotFound from '../../shared/components/UIElements/NotFound'

const CuisineRecipes = props =>  {

const [cuisine,setCuisine] = useState([])
const {id} = useParams()

useEffect(() => fetchRecipes(),[])
const fetchRecipes = () =>{
     console.log(typeof id)
    const selectedCuisine = cuisines.filter( cus => cus.id === parseInt(id))  
    console.log(selectedCuisine[0])
    setCuisine(selectedCuisine[0])

}

    return (
        <React.Fragment>
            {cuisine === undefined && <NotFound /> }
            {cuisine !== undefined &&  cuisine.length !== 0 &&
           
            <Container className='card-box-recipes'>
                 <h3 className='cuisine-title'>{cuisine.cuisine}</h3>
                <Row>
                   <CardDeck>
                        {cuisine.recipes.map(recipe=>
                                <Col xs={3} md={6} lg={3}  key={recipe.id} className='recipe-box' >
                                  
                                    <CardBox 
                                            price={recipe.pricePerServing}
                                            image={recipe.image}
                                            servings={recipe.serving}
                                            title={recipe.title}
                                            readyInMinutes={recipe.readyInMinutes}
                                            rid={recipe.id}
                                            cid={id}
                                        />
                                   
                                       
                                  
                                </Col>
                        )}
                    </CardDeck>
                </Row>
            </Container>
              
   
            }
           
        </React.Fragment>
    
    )
}
export default CuisineRecipes