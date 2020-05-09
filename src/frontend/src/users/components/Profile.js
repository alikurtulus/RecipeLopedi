import React, {useEffect, useState,useContext} from 'react'
import axios from 'axios'
import {AuthContext} from '../../shared/context/auth-context'
import {Container,Row,Card,Col,Figure,Button, Spinner,ListGroup,Popover,OverlayTrigger,Image } from 'react-bootstrap'
import './Profile.css'
import UserEdit from '../../users/components/UserEdit'
import UserRecipes from './UserRecipes'
import MealPlans from '../../mealplans/MealPlans'
import emailIcon from '../../assets/email.png'
import ageIcon from '../../assets/age.png'
import userIcon from '../../assets/user.png'
import genderIcon from '../../assets/gender.png'

const  Profile = () => {
    const auth  = useContext(AuthContext)
    const [data,setData] = useState({})
    const [isEditClicked,setIsEditClicked] = useState(true)
    const [isFavClicked,setIsFavClicked] = useState(true)
    const [isRecClicked,setIsRecClicked] = useState(true)
    
    const [isMealClicked,setIsMealClicked] = useState(true)

    useEffect(() => {
        const fetchUser = async () =>{
            const responseData = await axios.get(process.env.REACT_APP_BACKEND_URL+'/users/profile',{
                headers: {Authorization : `Bearer ${auth.token}`} })
               
                setData(responseData.data.user)
         }
         fetchUser()

    },[])
    const popoverRecipe = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Notifcation</Popover.Title>
          <Popover.Content>
           Could not find your recipes
          </Popover.Content>
        </Popover>
      );
      const popoverYourFav = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Notifcation</Popover.Title>
          <Popover.Content>
           Could not find your favourite recipes
          </Popover.Content>
        </Popover>
      );
      const popoverYourMealPlan = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Notifcation</Popover.Title>
          <Popover.Content>
           Could not find your meal plans
          </Popover.Content>
        </Popover>
      );



    const handleEditClick = (e) => {
        e.preventDefault()
        setIsEditClicked(!isEditClicked)
       
    }
    const handleRecipesClick = (e) => {
        e.preventDefault()
        setIsRecClicked(!isRecClicked)
    }
    const handleMyFavClick = (e) => {
        e.preventDefault()
        setIsFavClicked(!isFavClicked)
    }
    const handleMyMealPlanClick = (e) => {
        e.preventDefault()
        setIsMealClicked(!isMealClicked)
    }
    const handleUpdate = (updatedUser) => {
        setData(updatedUser)
    }
    return (
        <Container className='profile-container'>
            {data === undefined && <Spinner animation="border" variant="primary" />}
            {data !== undefined &&
                <Card>
                    <h4 className='bottom-container-title'>User Info</h4>
                    <Row className='user-details-container'>
                
                        <Col sm={3}>
                            <Figure>
                                <Figure.Image
                                    width={175}
                                    height={180}
                                    alt="171x180"
                                    className='avatar'
                                    src={process.env.REACT_APP_ASSET_URL+`/${data.image}`}
                                />
                                <Figure.Caption className='btn-edt-container'>
                                <Button
                                       variant={isEditClicked ? "primary" : "danger"}
                                       onClick={handleEditClick}>
                                       {isEditClicked ? 'Edit Profile' : "Don't Edit Profile"}
                                </Button>
                                </Figure.Caption>
                            </Figure>
                            
                        </Col>
                        <Col sm={9}>
                            <ListGroup horizontal='xl' >
                                <ListGroup.Item>
                                    <span><Image className='user-icon'  src={userIcon} /></span>
                                    <strong>Username: </strong>{data.username}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span><Image className='email-icon' src={emailIcon} /></span>
                                    <strong>Email: </strong>{data.email}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span><Image className='age-icon' src={ageIcon} /></span>
                                    <strong>Age: </strong>{data.age}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span><Image className='gender-icon' src={genderIcon} /></span>
                                    <strong>Gender: </strong>{data.gender}
                                </ListGroup.Item>
                            </ListGroup>
                            <div className='btn-container'>
                                {data.recipes &&
                                  <>
                                        {data.recipes.length === 0 &&
                                            <OverlayTrigger trigger="click" placement="top" overlay={popoverRecipe}>
                                                <Button
                                                        variant={isRecClicked ? 'success' : 'danger'}
                                                        className='btn-button' onClick={handleRecipesClick}>
                                                        {isRecClicked ? 'Show My Recipes' : "Don't show My Recipes"}
                                                </Button>
                                            </OverlayTrigger>     
                                        }
                                        {data.recipes.length !== 0 && 
                                            <Button
                                            variant={isRecClicked ? 'success' : 'danger'}
                                            className='btn-button' onClick={handleRecipesClick}>
                                            {isRecClicked ? 'Show My Recipes' : "Don't show My Recipes"}
                                            </Button>
                                        }  
                                 </>
                                } 
                                {data.myFavouriteRecipes &&
                                    <>
                                        {data.myFavouriteRecipes.length === 0 && 
                                            <OverlayTrigger trigger="click" placement="top" overlay={popoverYourFav}>
                                                <Button
                                                    variant={isFavClicked ? "warning" : "danger"}
                                                    className='btn-button' onClick={handleMyFavClick}>
                                                {isFavClicked ? "Show My Favourites" :"Don't show My Favourites "}
                                                </Button>
                                            </OverlayTrigger>
                                        
                                        }
                                        {data.myFavouriteRecipes.length !== 0 && 
                                            <Button
                                                variant={isFavClicked ? "warning" : "danger"}
                                                className='btn-button' onClick={handleMyFavClick}>
                                                {isFavClicked ? "Show My Favourites" :"Don't show My Favourites "}
                                            </Button>  
                                        }
                                    </>
                                }
                                {data.mealplans && 
                                  <>
                                        {data.mealplans.length === 0 && 
                                            <OverlayTrigger trigger="click" placement="top" overlay={popoverYourMealPlan}>
                                                <Button 
                                                    variant={isMealClicked ? "info" : "danger"}
                                                    className='btn-button' onClick={handleMyMealPlanClick}>
                                                    {isMealClicked ? "Show My MealPlans" : "Don't show My MealPlans"}
                                                </Button>
                                            </OverlayTrigger>
                                        }
                                        {data.mealplans.length !== 0 &&
                                            <Button 
                                                variant={isMealClicked ? "info" : "danger"}
                                                className='btn-button' onClick={handleMyMealPlanClick}>
                                                {isMealClicked ? "Show My MealPlans" : "Don't show My MealPlans"}
                                            </Button>
                                        }
                                  </>
                                }                    
                            </div>
                        </Col>
                    </Row>
                   
                    <Row>
                        <Col sm={12}>
                            {!isEditClicked && 
                                <>
                                    <hr />
                                    <h4 className='bottom-container-title'>User Details</h4>
                                    <UserEdit data={data} onUpdateUser={handleUpdate} />
                                </>
                            }
                            {!isRecClicked &&
                                <>
                                    {data.recipes.length !== 0 && 
                                     <>
                                        <hr />
                                        <h4 className='bottom-container-title'>My Recipes</h4>
                                        <UserRecipes crud={true} recipes={data.recipes} />
                                     </>
                                    }
                                </>
                            }
                            {!isFavClicked &&
                                <>
                                    {data.myFavouriteRecipes.length !== 0 && 
                                     <>
                                        <hr />
                                        <h4 className='bottom-container-title'>My Favourites Recipes</h4>
                                        <UserRecipes crud={true} recipes={data.myFavouriteRecipes} />
                                     </>
                                    }
                                </>
                            }
                            {!isMealClicked && 
                                <>
                                    {data.mealplans.length !== 0 && 
                                      <>
                                        <hr/>
                                        <h4 className='bottom-container-title'>My Meal Plans</h4>
                                        <MealPlans crud={true} myMealPlans={data.mealplans} />
                                     </>
                                    }
                                </>
                            }
                        </Col>
                    </Row>
                </Card>
            
            }
          
        </Container>
    )
}
export default Profile