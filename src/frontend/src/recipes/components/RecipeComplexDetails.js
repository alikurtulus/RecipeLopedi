import React,{useState,useEffect} from 'react'
import { useParams} from "react-router";
import { useSelector, useDispatch}  from 'react-redux'
import './RecipeDetails.css'
import {Container,Row,Col,Figure,Table,Card,Button,ListGroup, Spinner,Image,Badge,Modal} from 'react-bootstrap'
import CardBox from '../../shared/components/UIElements/CardBox'
import {fetchRecipeDetailsInfo} from '../../redux-stuff/actions/recipeActions'
import likedIcon from '../../assets/liked.png'
import servedIcon from '../../assets/served.png'
import clockIcon from '../../assets/clock.png'
import moneyIcon from '../../assets/price.png'
import ratingIcon from '../../assets/rating.png'
import dietIcon from '../../assets/diet.png'

  const  RecipeComplexDetails = () =>  {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const [index, setIndex] = useState(0);
    const [isError,setError] = useState('')
    const [nutrientIndicators,setNutrientIndicators] = useState([{name:'energy'},{name:'fat'},{name:'saturates'},{name:'carbs'},{name:'sugars'},{name:'fibre'},{name:'protein'},{name:'salt'}])
    const {id} = useParams()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect( () => { 
        const fetchData = async () => {
            try{
                await  dispatch(fetchRecipeDetailsInfo(id))
            }
            catch(err){
                setShow(true);
                setError(err.response.data.message)
            }
          
        }
        fetchData()
    },[dispatch,id])
 
    const recipeData  = useSelector(state => state.recipes.recipeDetailsInfo )
    const recipe = recipeData[0]
    
    const similarRecipes = recipeData[1]
    const recipeNutrition = recipeData[2]
  
    
    return (
        <React.Fragment>
               <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Error Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>{isError}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
               </Modal>
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
                           
                            <Row className='badges badges-container'> 
                                <Col className='details-icon'>
                                    <div>
                                    <Image className='detail-icon-img' src={servedIcon}/>
                                    </div>
                                    <div>
                                        <Badge variant="secondary" className='badge'>
                                            Serving: {recipe.servings}
                                        </Badge>
                                    </div>
                                </Col>
                                <Col  className='details-icon'>
                                    <div>
                                        <Image className='detail-icon-img' src={moneyIcon}/>
                                    </div>
                                    <div>
                                        <Badge variant="success" className='badge'>
                                            PerServingPrice:£ {parseFloat(recipe.pricePerServing /40).toFixed(2)} 
                                        </Badge>
                                    </div>
                                </Col>
                                <Col className='details-icon'>
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
                                        Rating: {   Math.floor((Math.random() * 4) + 1) + '.'+ Math.floor((Math.random() * 100) + 1)}
                                    </Badge>
                                </div>
                              </Col>
                               
                            </Row>
                           
                            </Col>
                        </Row>
                        <Row >
                            <Col>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                        {nutrientIndicators.map( (n,index) => 
                                             <th key={index}>{n.name} </th>
                                        )}    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recipeNutrition.good[17] !== undefined && 
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
                                        
                                        }
                                    </tbody>
                                </Table>
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4} lg={4} xl={4}>
                        <Card className='ingredient-container' >
                                <ListGroup variant="flush">
                                    {recipe.extendedIngredients.map((ingredient,index) => 
                                        <ListGroup.Item key={index}>{ingredient.originalString}</ListGroup.Item>   
                                     )}
                                </ListGroup>
                        </Card>
                    </Col>
                    <Col xs={12} md={8} lg={8} xl={8}>
                        <Card  className='instruction-container'  >
                               
                                <ListGroup variant="flush">
                                    {recipe.analyzedInstructions[0] !== undefined && recipe.analyzedInstructions[0].steps.map(method =>

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