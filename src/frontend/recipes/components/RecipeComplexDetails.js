import React,{useState,useEffect} from 'react'
import { useParams} from "react-router";
import axios from 'axios'
import './RecipeDetails.css'
import {Container,Row,Col,Figure,Table,Card,ListGroup, Spinner,Badge} from 'react-bootstrap'

  const  RecipeComplexDetails = () =>  {
      const [recipe,setRecipe] = useState()
      const {id} = useParams()
     
      const fetchRecipe = async () => {
          const responseData = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
          setRecipe(responseData.data)
          console.log(responseData.data)
      }
   useEffect(() => {fetchRecipe()} ,[id])


    return (
        <React.Fragment>
         {recipe === undefined &&  <Spinner animation="border" variant="primary" /> }
         {recipe !== undefined &&
        <Container className='recipedetails-box'>
                <Row>
                    <Col sm={4}>
                        <Figure>
                            <Figure.Image
                                width={300}
                                height={300}
                                alt="171x180"
                                src={recipe.image}
                            />
  
                        </Figure>
                    </Col>
                    <Col sm={8}>
                        <Row>
                            <Col className='some-details'>
                             <h3 className='recipe-title'>{recipe.title}</h3>
                             <p className='recipe-summary'>{recipe.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                             <p className='badges'>
                                
                                 <Badge variant="warning" className='badge'>
                                     Serving: {recipe.servings}
                                 </Badge>
                                 <Badge variant="success" className='badge'>
                                     PerServingPrice: {recipe.pricePerServing}
                                 </Badge>
                                 <Badge variant="danger" className='badge'>
                                     ReadyInMinutes: {recipe.readyInMinutes}
                                 </Badge>
                                 {recipe.diets.map(diet => 
                                     <Badge key={diet} variant='primary' className='badge'>
                                         {diet}
                                     </Badge>
                                 )}
                            </p>
                            </Col>
                        </Row>
                        <Row>
                          
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Card   style={{ width: '18rem' }}>
                                <ListGroup variant="flush">
                                    {recipe.extendedIngredients.map(ingredient => 
                                        <ListGroup.Item>{ingredient.originalString}</ListGroup.Item>
                                        
                                     )}
                                </ListGroup>
                        </Card>
                    </Col>
                    <Col sm={8}>
                  
                        <Card   style={{ width: '46rem' }}>
                               
                                <ListGroup variant="flush">
                                    {recipe.analyzedInstructions[0].steps.map(method =>

                                    <ListGroup.Item key={method.number}>{method.step}</ListGroup.Item>
                                        
                                    )}                         
                                </ListGroup>
                        </Card>
                    </Col>
                </Row>
           </Container>
        }
        </React.Fragment>
    )
}

export default RecipeComplexDetails