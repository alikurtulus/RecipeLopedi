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
import NotFound from '../../shared/components/UIElements/NotFound'


 const RecipeDetails = props =>  {
   const [recipe, setRecipe] = useState([])
   const [totalRating,setTotalRating] = useState(0)
   const {id} = useParams()
   let location = useLocation();
 
  
   const fetchRecipeData = () => {
    let cId
    if(location.state !== undefined){
        let cId = location.state.cuisineId
        const selectedRecipe = cuisines[cId -1].recipes.filter(r => r.id === parseInt(id))
        setRecipe(selectedRecipe[0])
       }
      
 
   
   }

  useEffect(() => {fetchRecipeData()},[])

    return (
        <React.Fragment>
         {recipe.length === 0 &&  <NotFound /> }
         {recipe.length !== 0 &&
        <Container className='recipedetails-box'>
                <Row>
                    <Col xs={12} md={6} lg={4}>
                        <Figure className='recipe-image-container'>
                            <Figure.Image
                               
                                alt="171x180"
                                src={recipe.image}
                            />
  
                        </Figure>
                    </Col>
                    <Col xs={12} md={6} lg={8}>
                        <Row>
                            <Col className='some-details'>
                             <h3 className='recipe-title'>{recipe.title}</h3>
                           
                            <Row className='badges badges-container'>
                              <Col xs={12} md={6} lg={3} className='details-icon'>
                                <div>
                                <Image className='detail-icon-img' src={servedIcon}/>
                                </div>
                                <div>
                                    <Badge variant="secondary" className='badge'>
                                        Serving: {recipe.serving}
                                    </Badge>
                                </div>
                              </Col>
                              <Col xs={12} md={6} lg={3} className='details-icon'>
                                <div>
                                    <Image className='detail-icon-img' src={moneyIcon}/>
                                </div>
                                <div>
                                    <Badge variant="success" className='badge'>
                                        PerServingPrice: {recipe.pricePerServing} 
                                    </Badge>
                                </div>
                              </Col>
                              <Col xs={12} md={6} lg={3} className='details-icon'>
                                <div>
                                    <Image className='detail-icon-img' src={ratingIcon}/>
                                </div>
                                <div>
                                    <Badge variant="primary" className='badge'>
                                        Rating: {recipe.rating}
                                    </Badge>
                                </div>
                              </Col>
                              <Col xs={12} md={6} lg={3} className='details-icon'>
                                <div>
                                    <Image className='detail-icon-img' src={clockIcon}/>
                                </div>
                                <div>
                                    <Badge variant="danger" className='badge'>
                                        ReadyInMinutes: {recipe.readyInMinutes}
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
                    <Col xs={12} md={4} lg={4}>
                        <Card  className='ingredient-container'>
                                <ListGroup variant="flush">
                                    {recipe.Ingredients.map(ingredient => 
                                        <ListGroup.Item>{ingredient}</ListGroup.Item>
                                        
                                     )}
                                </ListGroup>
                        </Card>
                    </Col>
                    <Col sm={12} md={8} lg={8}>
                  
                        <Card  className='instruction-container' >
                               
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