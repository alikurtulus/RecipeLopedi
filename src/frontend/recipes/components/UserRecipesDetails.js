import React,{useState,useEffect,useContext} from 'react'
import { useParams, useLocation} from "react-router";
import ReactStars from 'react-stars'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch}  from 'react-redux'
import './RecipeDetails.css'
import {Container,Row,Col,Figure,Card,ListGroup,Button,InputGroup,FormControl,Spinner,Badge,Modal} from 'react-bootstrap'
import {fetchUsersRecipeDetails} from '../../redux-stuff/actions/recipeActions'
import axios from 'axios';
import {AuthContext} from '../../shared/context/auth-context'
import Comment from '../../shared/components/FormElements/Comment'

  const  UserRecipesDetails = props =>  {
    let location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [isCrud,SetIsCrud] = useState(location.state.crud)
    const [creator,setCreator] = useState(location.state.creator)
    const [isError,setError] = useState('')
    const [isCommented,setIsComment]= useState(false)
    const [userComment,setUserComment] = useState('')
    const [isFavourite,setIsFavourite] = useState(true)
    const [selectedIndex,setSelectedIndex] = useState()
    const [isRated,setIsRated] = useState(true)
    const [selectedRecipe,setSelectedRecipe] = useState([])
    const [totalRating,setTotalRating] = useState(0)
    const [rating,setRating] = useState(0)
    const [updatedComment,setUpdatedComment] = useState('')
    const auth  = useContext(AuthContext)
    const [isEdit,setIsEdit] = useState(false)
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
 
   

    let recComments
    if(recipe.comments !==  undefined){
         recComments = recipe.comments.reverse()
    }
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
    },[rating,totalRating])   



    const handleCommentChange =  (e) => {
       
        setUserComment(e.target.value)
       
    }
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
 
    const handleUpdateChange = (e) => {
        e.preventDefault()
        setUpdatedComment(e.target.value)
      
    }
    const handleRemoveComment = async (index,userId) => {
        console.log(index)
       const responseData = await axios.post(process.env.REACT_APP_BACKEND_URL +`/recipes/recipe/comments/delete/${rid}`,{commentId:index,userId:userId},{
        headers: {Authorization : `Bearer ${auth.token}`} })
        console.log(responseData)
        setSelectedRecipe(responseData.data.recipe.comments)
        setIsComment(true)
        
    }
    const handleUpdateComment =   (index,userId) => {
        let selectedComment =  recipe.comments.filter(c => c.id === index)
        if(selectedComment){
            setIsEdit(!isEdit)
            setSelectedIndex(index)
            setUpdatedComment({updatedComment:''})
        }
    }
    const handleUpdateCommentSave = async (index,userId) => {
       
        const responseData = await axios.put(process.env.REACT_APP_BACKEND_URL +`/recipes/recipe/comments/update/${rid}`,
        {commentId:index,userId:userId,newContent:updatedComment},{
            headers: {Authorization : `Bearer ${auth.token}`} })
            console.log(responseData)
            setIsComment(true)
            setSelectedIndex(index)
            setUpdatedComment({updatedComment:''})
            setSelectedRecipe(responseData.data.recipe.comments)
           
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        try{
            const responseData = await axios.delete(process.env.REACT_APP_BACKEND_URL+`/recipes/${rid}`,{
                headers: {Authorization : `Bearer ${auth.token}`} })
                console.log(responseData)
                history.push('/users/profile')
        }
        catch(err){
            console.log(err)
        }

    }
    const handleEdit = async (e) => {
        e.preventDefault()
        history.push('/recipe/update',{data:recipe})
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
                              <h4 className='rating'>Rating</h4>
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
                              {isCrud !== undefined   && creator === auth.userId &&
                              <React.Fragment>
                                  <div  className='crud-buttons'>
                                    <Button variant='warning' className='btn-edit' size="lg" onClick={handleEdit} >Edit</Button>
                                    <Button variant='danger' className='btn-delete'  size="lg" onClick={handleDelete} >Delete</Button>
                                  </div>
                              </React.Fragment>
                              }
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
                         onChange={handleCommentChange}
                         value={userComment}
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
               {!isCommented && recComments.map(com => 
                <Comment 
                    key={com.id}
                    id={com.id}
                    user={com.user}
                    content={com.content}
                    updatedAt={com.updatedAt}
                    isEdit={isEdit}
                    selectedIndex={selectedIndex}
                    deleteComment={() => handleRemoveComment(com.id,com.user)} 
                    updateComment={() => handleUpdateComment(com.id,com.user)}
                    updateCommentChange={handleUpdateChange}
                    updatedCommentSave ={() => handleUpdateCommentSave(com.id,com.user)}
                    updatedComment={updatedComment}
                />
                 )} 
               {isCommented && selectedRecipe.length !== 0 &&  selectedRecipe.map(com => 
                <Comment
                    key={com.id}
                    id={com.id}
                    user={com.user.id}
                    content={com.content}
                    updatedAt={com.updatedAt}
                    isEdit={isEdit}
                    selectedIndex={selectedIndex}
                    deleteComment={() => handleRemoveComment(com.id,com.user.id)} 
                    updateComment={() => handleUpdateComment(com.id,com.user.id)}
                    updateCommentChange={handleUpdateChange}
                    updatedCommentSave ={() => handleUpdateCommentSave(com.id,com.user.id)}
                    updatedComment={updatedComment}
                     />
                 )}
             </div>
          }
         
     </Container>
        
         }
        </React.Fragment>
    )
}

export default UserRecipesDetails
