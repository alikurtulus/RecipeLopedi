import React,{useState,useEffect,useContext} from 'react'
import { useParams} from "react-router";
import ReactStars from 'react-stars'
import { useSelector, useDispatch}  from 'react-redux'
import './RecipeDetails.css'
import {Container,Row,Col,Figure,Card,ListGroup,Button,InputGroup,FormControl,Spinner,Badge,Modal} from 'react-bootstrap'
import {fetchUsersRecipeDetails} from '../../redux-stuff/actions/recipeActions'
import axios from 'axios';
import {AuthContext} from '../../shared/context/auth-context'
import Comment from '../../shared/components/FormElements/Comment'

  const  UserRecipesDetails = () =>  {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [isError,setError] = useState('')
    const [isCommented,setIsComment]= useState(false)
    const [userComment,setUserComment] = useState('')
    const [isFavourite,setIsFavourite] = useState(true)
    const [isRated,setIsRated] = useState(true)
    const [selectedRecipe,setSelectedRecipe] = useState()
    const [totalRating,setTotalRating] = useState(0)
    const [rating,setRating] = useState(0)
    const auth  = useContext(AuthContext)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {rid} = useParams()
    useEffect( () => { 
        const fetchData = async () => {
          await  dispatch(fetchUsersRecipeDetails(rid))
        }
        fetchData()
    },[dispatch,rid])
    let recipe  = useSelector(state => state.recipes.usersRecipeDetailsInfo )
  
    const ratingChanged = (newRating) => {
        setRating(newRating)
        setIsRated(false)
    }
    const handleMyFavouriteClick = async () => {
        if(isFavourite){
            try{
                const responseData = await axios.post(  process.env.REACT_APP_BACKEND_URL+`/recipes/user/myfavouriteRecipe/${rid}`,{userId:auth.userId},
                {
                headers: {Authorization : `Bearer ${auth.token}`} })
                setIsFavourite(!isFavourite)
            }
            catch(err){
                setError('This recipe already exist in your list')
                setShow(true)
            }
        }
        else{
            const responseData = await axios.post(process.env.REACT_APP_BACKEND_URL+`/recipes/user/usermyfavouriteRecipe/delete/${rid}`,{userId:auth.userId},
            {
            headers: {Authorization : `Bearer ${auth.token}`} })
            
            setIsFavourite(!isFavourite)
        }
    }
     
    useEffect(() => {
        const setRating = async () => {
            if(rating !== 0){
                const responseData = await axios.post(
                    process.env.REACT_APP_BACKEND_URL+`/recipes/recipe/rating/${rid}`,
                     {rating},{
                     headers: {Authorization : `Bearer ${auth.token}`} })
            }
        }
        setRating()
        const averageRating = async () => {
            if(recipe.ratings){
                let ratingTotal = recipe.ratings.length +1
                let total = 0
                recipe.ratings.map(rat => {
                    total += rat.point
                })
                total += rating
                setTotalRating( parseFloat(total/ratingTotal).toFixed( 2 ))
            }
        }
        averageRating()
    },[ratingChanged,rating,totalRating])   
    
    const handleSendComment = async (e) => {
        e.preventDefault()
        const responseData = await axios.post(process.env.REACT_APP_BACKEND_URL+`/recipes/comment/recipe/${rid}`,{content:userComment,userId:auth.userId},
        {
        headers: {Authorization : `Bearer ${auth.token}`} })
        console.log(responseData.data)

        setSelectedRecipe(responseData.data.recipe.comments.reverse())
        setIsComment(true)
        setUserComment('')
      
    }
    const handleChange =  (e) => {
        setUserComment(e.target.value)
        console.log(userComment)
    }
    

    return (
        <React.Fragment>
         {recipe === undefined   && <Spinner animation="border" variant="primary" /> }
         {recipe !==  undefined  &&
         
          <Container className='recipedetails-box'>
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
          <Row>
              <Col sm={4}>
                  <Figure  border="secondary">
                      <Figure.Image className='card-recipe-image'
                          alt="171x180"
                          src={process.env.REACT_APP_ASSET_URL +`/${recipe.image}`}
                      />
                  </Figure>
              </Col>
              <Col sm={8}>
                  <Row>
                      <Col className='some-details'>
                          <h3 className='recipe-title'>{recipe.title}</h3>
                          <p className='badges badges-container'>
                              <Badge variant="warning" className='badge'>
                                  Serving: {recipe.servings}
                              </Badge>
                              <Badge variant="success" className='badge'>
                                  PerServingPrice: {recipe.pricePerServing}
                              </Badge>
                              <Badge variant="danger" className='badge'>
                                  ReadyInMinutes: {recipe.readyInMinutes}
                              </Badge>
                              <Badge variant="primary" className='badge'>
                                  Rating: {totalRating}
                              </Badge>
                          </p>
                          {auth.token && 
                             <div>
                              <h4>Rating</h4>
                              <ReactStars
                              count={5}
                              onChange={ratingChanged}
                              size={30}
                              edit={isRated}
                              value={rating}
                              color2={'#ffd700'} />
                              <Button variant={isFavourite ? "success" :"danger" } size="lg" onClick={handleMyFavouriteClick}>
                              {isFavourite ? "Add your favourite" :"Remove your favourite" }
                              </Button> 
                             </div>
                          }
                      </Col>
                  </Row>
              </Col>
          </Row>
          <Row>
              <Col sm={4}>
                  <Card  style={{ width: '22rem' }}>
                          <ListGroup variant="flush">
                          {recipe.ingredients && recipe.ingredients.map(ing =>
                            <ListGroup.Item key={ing.id}>{ing.amount} {ing.measure} {ing.name}</ListGroup.Item>
                            )}     
                            
                          </ListGroup>
                  </Card>
              </Col>
              <Col sm={8}>
                  <Card  style={{ width: '46rem' }}>
                          <ListGroup variant="flush">
                          {recipe.instructions && recipe.instructions.map(ins =>
                            <ListGroup.Item key={ins.id}>{ins.content}</ListGroup.Item>
                            )}                       
                          </ListGroup>
                  </Card>
              </Col>
          </Row>
          <Row className='comment-container'>
              {auth.token &&
                       <Col>
                       <InputGroup className="mb-3">
                         <FormControl
                         placeholder="Give some comments ..."
                         aria-label="Recipient's username"
                         aria-describedby="basic-addon2"
                         onChange={handleChange}
                         />
                         <InputGroup.Append>
                         <Button variant="success" onClick={handleSendComment}>Comment</Button>
                         </InputGroup.Append>
                      </InputGroup>
                     </Col>
              
              }
      
          </Row>
          {recipe.comments === undefined   && <Spinner animation="border" variant="primary" /> }
          {recipe.comments !==  undefined  &&
             <div>
               {!isCommented &&  recipe.comments.reverse().map(com => 
                <Comment user={com.user} content={com.content} updatedAt={com.updatedAt} />
                 )} 
               {isCommented && selectedRecipe.length !== 0 &&  selectedRecipe.map(com => 
                <Comment user={com.user.id} content={com.content} updatedAt={com.updatedAt} />
                 )}
             </div>
          }
         
     </Container>
        
         }
        </React.Fragment>
    )
}

export default UserRecipesDetails
