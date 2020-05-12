import React,{useState,useEffect} from 'react'
import { useParams, useLocation} from "react-router";
import {Container,Row,Col,Figure,Table,Card,ListGroup, Spinner,Badge,Image} from 'react-bootstrap'
import cuisines from '../../shared/lib/cuisines'
import './RecipeDetails.css'
import likedIcon from '../../assets/liked.png'
import servedIcon from '../../assets/served.png'
import clockIcon from '../../assets/clock.png'
import moneyIcon from '../../assets/price.png'
import ratingIcon from '../../assets/rating.png'


 const RecipeDetails = props =>  {
   const [recipe, setRecipe] = useState([])
   const [totalRating,setTotalRating] = useState(0)
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
                           
                            <Row className='badges badges-container'>
                              <Col sm={3} className='details-icon'>
                                <div>
                                <Image className='detail-icon-img' src={servedIcon}/>
                                </div>
                                <div>
                                    <Badge variant="secondary" className='badge'>
                                        Serving: {recipe.serving}
                                    </Badge>
                                </div>
                              </Col>
                              <Col sm={3} className='details-icon'>
                                <div>
                                    <Image className='detail-icon-img' src={moneyIcon}/>
                                </div>
                                <div>
                                    <Badge variant="success" className='badge'>
                                        PerServingPrice: {recipe.pricePerServing}
                                    </Badge>
                                </div>
                              </Col>
                              <Col sm={3} className='details-icon'>
                                <div>
                                    <Image className='detail-icon-img' src={clockIcon}/>
                                </div>
                                <div>
                                    <Badge variant="danger" className='badge'>
                                        ReadyInMinutes: {recipe.readyInMinutes}
                                    </Badge>
                                </div>
                              </Col>
                              <Col sm={3} className='details-icon'>
                                <div>
                                    <Image className='detail-icon-img' src={ratingIcon}/>
                                </div>
                                <div>
                                    <Badge variant="primary" className='badge'>
                                        Rating: {recipe.rating}
                                    </Badge>
                                </div>
                              </Col>
                          </Row>
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