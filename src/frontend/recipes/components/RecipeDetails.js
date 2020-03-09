import React,{useState,useEffect} from 'react'
import { useParams, useLocation} from "react-router";
import {Container,Row,Col,Figure,Table,Card,ListGroup, Spinner} from 'react-bootstrap'
import cuisines from '../../shared/lib/cuisines'

 const RecipeDetails = props =>  {
   const [recipe, setRecipe] = useState([])
   const {id} = useParams()
   let location = useLocation();
  
   let cId = location.state.cuisineId
   const fetchRecipeData = () => {
    const selectedRecipe = cuisines[cId -1].recipes.filter(r => r.id === parseInt(id))
    setRecipe(selectedRecipe[0])
   
   }

  useEffect(() => fetchRecipeData(),[])

    return (
        <React.Fragment>
         {recipe.length === 0 &&  <Spinner animation="border" variant="primary" /> }
         {recipe.length !== 0 &&
        <Container className='recipedetails-box'>
                <Row>
                    <Col sm={3}>
                        <Figure>
                            <Figure.Image
                                width={220}
                                height={220}
                                alt="171x180"
                                src={recipe.image}
                            />
  
                        </Figure>
                    </Col>
                    <Col sm={9}>
                        <Row>
                            <Col>
                             <h3>{recipe.title}</h3>
                             <p>{recipe.summary}</p>
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
                    <Col sm={3}>
                        <Card style={{ width: '17rem' }}>
                                <ListGroup variant="flush">
                                    {recipe.Ingredients.map(ingredient => 
                                        <ListGroup.Item>{ingredient}</ListGroup.Item>
                                        
                                     )}
                                </ListGroup>
                        </Card>
                    </Col>
                    <Col sm={9}>
                        <Card style={{ width: '50rem' }}>
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