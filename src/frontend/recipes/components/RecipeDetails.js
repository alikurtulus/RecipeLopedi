import React,{useState,useEffect} from 'react'
import { useParams, useLocation} from "react-router";
import {Container,Row,Col,Figure,Table,Card,ListGroup, Spinner,Badge} from 'react-bootstrap'
import cuisines from '../../shared/lib/cuisines'
import './RecipeDetails.css'

 const RecipeDetails = props =>  {
   const [recipe, setRecipe] = useState([])
   const {id} = useParams()
   let location = useLocation();
  
   let cId = location.state.cuisineId
   const fetchRecipeData = () => {
    const selectedRecipe = cuisines[cId -1].recipes.filter(r => r.id === parseInt(id))
    setRecipe(selectedRecipe[0])
   
   }

  useEffect(() => {fetchRecipeData()},[])

    return (
        <React.Fragment>
         {recipe.length === 0 &&  <Spinner animation="border" variant="primary" /> }
         {recipe.length !== 0 &&
        <Container className='recipedetails-box'>
                <Row>
                    <Col sm={4}>
                        <Figure>
                            <Figure.Image
                                width={280}
                                height={280}
                                alt="171x180"
                                src={recipe.image}
                            />
  
                        </Figure>
                    </Col>
                    <Col sm={8}>
                        <Row>
                            <Col className='some-details'>
                             <h3 className='recipe-title'>{recipe.title}</h3>
                             <p className='recipe-summary'>{recipe.summary}</p>
                             <p className='badges'>
                                 <Badge variant="primary" className='badge' >
                                     Rating: {recipe.rating}
                                 </Badge>
                                 <Badge variant="warning" className='badge'>
                                     Serving: {recipe.serving}
                                 </Badge>
                                 <Badge variant="success" className='badge'>
                                     PerServingPrice: {recipe.pricePerServing}
                                 </Badge>
                                 <Badge variant="danger" className='badge'>
                                     ReadyInMinutes: {recipe.readyInMinutes}
                                 </Badge>
                            </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        {recipe.NutritionIndicators.map( n => 
                                             <th>{n.name} </th>
                                        )}    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                         {recipe.NutritionIndicators.map( n =>
                                         <td>{n.amount}</td>
                                          )}         
                                        </tr>
                                    
                                    </tbody>
                                </Table>
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Card   style={{ width: '18rem' }}>
                                <ListGroup variant="flush">
                                    {recipe.Ingredients.map(ingredient => 
                                        <ListGroup.Item>{ingredient}</ListGroup.Item>
                                        
                                     )}
                                </ListGroup>
                        </Card>
                    </Col>
                    <Col sm={8}>
                  
                        <Card   style={{ width: '46rem' }}>
                               
                                <ListGroup variant="flush">
                                    {recipe.Instructions.map(method =>

                                    <ListGroup.Item>{method}</ListGroup.Item>
                                        
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
export default RecipeDetails