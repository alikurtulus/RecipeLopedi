import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch}  from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import {Form,Container,Button,Row, Col,CardDeck,Spinner,Image} from 'react-bootstrap'
import axios from 'axios'
import hatIcon from '../../assets/recipehat.png'
import DietPage from './DietPage'
import './Home.css'


import CardBox from '../components/UIElements/CardBox'
import {fetchHeroPage} from '../../redux-stuff/actions/recipeActions'
const Hero = props => {
  const history = useHistory()
  
 const dispatch = useDispatch()
   useEffect(() =>{
     const fetchData = async () => {
       await  dispatch(fetchHeroPage())  
     }
     fetchData()
    
   } ,[dispatch])
   const heroData = useSelector(state => state.recipes.heroInfo)

   const joke  = heroData[0]
   const randomRecipes = heroData[1]
   const [selectedOption, setSelectedOption] = useState({})
   const [results, setResults]= useState()

  const fetchData = (inputValue, callback) => {
    if(!inputValue){
      callback([])
    }
    else{
         setTimeout(() => {
           fetch(`https://api.spoonacular.com/recipes/autocomplete?number=10&query=${inputValue}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`,{
             method:"GET"
           })
           .then((resp) => {
             return resp.json()
           })
           .then((data) => {
             const tempArray = []
             data.forEach((element) => {
               tempArray.push({label:`${element.title}`, value:element.id})
             });
             callback(tempArray);
           })
           .catch((error) => {
             console.log(error, 'catch the hoop')
           })
         })
    }
  }
 const  onSearchChange = (selectedOption) => {
    if(selectedOption){
      setSelectedOption(selectedOption)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let queryString
    if(selectedOption.label.indexOf(' ') >= 0 ) {
      queryString = selectedOption.label.split(' ')
      queryString =  queryString.join('+')
      console.log(queryString)
    }
    else{
      queryString = selectedOption.label
    }
    const responseData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${queryString}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
    console.log(responseData )
    history.push('/recipes/searches',{data:responseData.data.results})

  }
  
 return (
   
   <React.Fragment >
   {joke === undefined && randomRecipes === undefined &&  <Spinner animation="border" variant="primary" />}
   {joke !== undefined && randomRecipes !== undefined &&  <div className='main-container'>
   <Container>
     <div className='logo-container'>
       <h2 className='main-logo-name'><span><Image  src={hatIcon}  /></span>RecipeLopedi</h2>
      </div>
    <Form onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
            <Col sm={10}>
              <AsyncSelect
                value= {selectedOption}
                placeholder='Search a recipe...'
                loadOptions={fetchData}
                defaultOptions={false}
                onChange={(e) => {
                  onSearchChange(e)
                }}
              />
            </Col>
            <Col sm={2}>
              <Button type="submit" size="md" block >Search</Button>
            </Col>
        </Row>
        <Form.Text className="text-muted center" size='lg'>
          {joke}
        </Form.Text>
    </Form>
   </Container>
   <Container className='cards-container'>
      <Row>
        <CardDeck>
        {randomRecipes.map(recipe =>
        <Col sm={3} key={recipe.id}>
          <CardBox
              id={recipe.id}
              price={recipe.pricePerServing}
              image={recipe.image}
              servings={recipe.servings}
              title={recipe.title}
              readyInMinutes={recipe.readyInMinutes}
              />
              
        </Col>
        )}
        </CardDeck>
      </Row>
    </Container>
   </div>
}
  
   </React.Fragment>

 )
}
export default Hero
