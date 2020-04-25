import React,{useState,useEffect} from 'react'
import { useParams} from "react-router";
import { useSelector, useDispatch}  from 'react-redux'
import './RecipeDetails.css'
import {Container,Row,Col,Figure,Table,Card,CardDeck,ListGroup, Spinner,Badge} from 'react-bootstrap'
import CardBox from '../../shared/components/UIElements/CardBox'
import {fetchRecipeDetailsInfo} from '../../redux-stuff/actions/recipeActions'

  const  RecipeComplexDetails = () =>  {
    const dispatch = useDispatch()
    const [index, setIndex] = useState(0);
    const [nutrientIndicators,setNutrientIndicators] = useState([{name:'energy'},{name:'fat'},{name:'saturates'},{name:'carbs'},{name:'sugars'},{name:'fibre'},{name:'protein'},{name:'salt'}])
    const {id} = useParams()
    useEffect( () => { 
        const fetchData = async () => {
          await  dispatch(fetchRecipeDetailsInfo(id))
        }
        fetchData()
    },[dispatch,id])
 
    const recipeData  = useSelector(state => state.recipes.recipeDetailsInfo )
    const recipe = recipeData[0]
    const similarRecipes = recipeData[1]
    const recipeNutrition = recipeData[2]
    console.log(similarRecipes)
    
    return (
        <React.Fragment>
         {recipe === undefined   &&  similarRecipes === undefined && recipeNutrition === undefined && <Spinner animation="border" variant="primary" /> }
         {recipe !==  undefined  && similarRecipes !== undefined && recipeNutrition !== undefined &&
        <Container className='recipedetails-box'>
                <Row>
                    <Col sm={4}>
                        <Figure  border="secondary">
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
                        <Row>
                            <Col>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        {nutrientIndicators.map( n => 
                                             <th>{n.name} </th>
                                        )}    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                           <td>{recipeNutrition.calories}cal</td>
                                           <td>{recipeNutrition.fat}</td>
                                           <td>{recipeNutrition.bad[2].amount}</td>
                                           <td>{recipeNutrition.carbs}</td>
                                           <td>{recipeNutrition.bad[4].amount}</td>
                                           <td>{recipeNutrition.good[17].amount}</td>
                                           <td>{recipeNutrition.protein}</td>
                                            <td>1.3g</td>
                                        </tr>
                                    
                                    </tbody>
                                </Table>
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Card  style={{ width: '22rem' }}>
                                <ListGroup variant="flush">
                                    {recipe.extendedIngredients.map(ingredient => 
                                        <ListGroup.Item>{ingredient.originalString}</ListGroup.Item>   
                                     )}
                                </ListGroup>
                        </Card>
                    </Col>
                    <Col sm={8}>
                        <Card  style={{ width: '46rem' }}>
                               
                                <ListGroup variant="flush">
                                    {recipe.analyzedInstructions[0].steps.map(method =>

                                    <ListGroup.Item key={method.number}>{method.step}</ListGroup.Item>
                                        
                                    )}                         
                                </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <h3 className='similar-header'>Similar Recipes</h3>
                <Row className='cards-container'>
                
                  <CardDeck className='card-deck'>
                  
                    {similarRecipes.map(similar => 
                    <Col className='card-similar-recipe' sm={3} key={similar.id}>
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