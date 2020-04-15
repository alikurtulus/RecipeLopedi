import React,{useState,useEffect} from 'react'
import { useParams} from "react-router";
import { useSelector, useDispatch}  from 'react-redux'
import axios from 'axios'
import './RecipeDetails.css'
import {Container,Row,Col,Figure,Table,Card,CardDeck,ListGroup, Spinner,Badge,Carousel} from 'react-bootstrap'
import CardBox from '../../shared/components/UIElements/CardBox'
import {fetchRecipeDetailsInfo} from '../../redux-stuff/actions/recipeActions'

  const  RecipeComplexDetails = () =>  {
    const dispatch = useDispatch()
    const [index, setIndex] = useState(0);
    const {id} = useParams()


    useEffect( () => { 
        dispatch(fetchRecipeDetailsInfo(id))
    },[])
 
   
    const recipeData  = useSelector(state => state.recipes.recipeDetailsInfo )
    const recipe = recipeData[0]
    const similarRecipes = recipeData[1]
    const recipeNutrition = recipeData[2]


    const handleSelect = (selectedIndex, e) => {
          setIndex(selectedIndex)
    }
    
    return (
        <React.Fragment>
         {recipe === undefined   &&  similarRecipes === undefined && <Spinner animation="border" variant="primary" /> }
         {recipe !==  undefined  && similarRecipes !== undefined &&
        <Container className='recipedetails-box'>
                <Row>
                    <Col sm={4}>
                        <Figure>
                            <Figure.Image className='card-recipe-image'
                               
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
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Card   style={{ width: '22rem' }}>
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
                <Row className='cards-container'>
                
                  <CardDeck>
                    {similarRecipes.map(similar => 
                    <Col sm={3} key={similar.id}>
                        <CardBox 
                                 cId={similar.id}
                                 title={similar.title}
                                 image={similar.image}
                                 servings={similar.servings}
                                 readyInMinutes={similar.readyInMinutes}
                                 mySimilar='similar'
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

export default RecipeComplexDetails