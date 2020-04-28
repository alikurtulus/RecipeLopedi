import React,{useContext,useState,useEffect} from 'react'
import {Container,Form,Row,Col,Card,Modal,Button,Dropdown} from 'react-bootstrap'
import Input from '../../frontend/shared/components/FormElements/Input'
import {useForm} from '../../frontend/shared/hooks/form-hooks'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../frontend/shared/util/validators'
import {AuthContext} from '../../frontend/shared/context/auth-context'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../recipes/components/NewRecipe.css'
import ExcludeItem from '../mealplans/ExcludeItem'
import DailyPlan from './DailyPlan'

const diets = ['Choose','Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Whole30']
const timeFrames = ['Choose','Day','Week']
const NewMealPlan = props => {
    const auth  = useContext(AuthContext)
    const history = useHistory()
    const [excludes,setExcludes] = useState([])
    const [excludeCount,setExcludeCount] = useState(0)
    const [excludeData, setExcludeData] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [isDailyPlan,setIsDaily] = useState(false)
    const [dailyPlanData,setDailyPlanData] = useState({})
    const [formState,inputHandler, setFormData]= useForm({
      title:{
        value:"",
        isValid:false
      },
      targetCalories:{
          value:"",
          isValid:false
      },
      diet:{
        value:"",
        isValid:false
      },
      timeFrame:{
          value:"",
          isValid:false
      },
      exclude:{
        value:"",
        isValid:false
    
      }
     
    },false)
    const addExclude = () => {
      
        setExcludes(prev => [...prev,excludeCount])
        setExcludeCount(excludeCount=> excludeCount + 1)
        
    }
    const handleExcludeRemove = (index) => {
        setExcludes(excludes.filter(exclude => exclude !== index))
        setExcludeCount(excludeCount => excludeCount - 1)   
    }
    const handleExcludeSave = (index) => {
           
        let  newArr = [...excludeData]
        newArr[index] = formState.inputs.exclude.value
        setExcludeData(newArr)
        console.log(excludeData)
    }
    const handleSearch = async (e) => {
        e.preventDefault()
        let myTimeFrame = formState.inputs.timeFrame.value
        let myDiet = formState.inputs.diet.value
        let myTargetCalories = formState.inputs.targetCalories.value
        let myExcludes = excludeData.join()
        
        const responseData = await axios.get(`https://api.spoonacular.com/mealplanner/generate?timeFrame=${myTimeFrame}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&diet=${myDiet}&targetCalories=${myTargetCalories}&exclude=${myExcludes}`)
        console.log(responseData)
        if(responseData.data.meals){
            setDailyPlanData(responseData.data)
            setIsDaily(true)
            console.log(dailyPlanData)

        }

      
    }
   
    return (
        <div className='recipe-main'>
            <h3>-</h3>
         
            <Container className='new-recipe-container' >
                <Card  border="secondary" className='recipe-form'>
                    <Form className='form-container'  >
                      <Row>
                        <Col sm={6}>
                            <Input 
                                element='input'
                                type='text'
                                id='title'
                                name='title'
                                label='Title'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please enter a title...'
                                placeholder='Please enter a title...'
                                onInput={inputHandler}
                            />
                             <Input
                                element='select'
                                id='diet'
                                label='Diet'
                                name='diet'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please choose your diet..'
                                placeholder='Please choose your diet..'
                                options={diets}
                                onInput={inputHandler}
                              />
                            <Form.Group controlId="exampleForm.SelectCustom" className='date-picker'>
                                <Form.Label>Date</Form.Label>
                                <DatePicker
                                    showPopperArrow={false}
                                    selected={startDate}
                                    onChange={date => setStartDate(date)} 
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Input 
                                element='input'
                                type='number'
                                id='targetCalories'
                                name='targetCalories'
                                label='Target Calories'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please enter a Target calories for a day...'
                                placeholder='Please enter a Target calories for a day...'
                                onInput={inputHandler}
                                />
                            <Input
                                element='select'
                                id='timeFrame'
                                label='Time Frame'
                                name='timeFrame'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please choose your time frame..'
                                placeholder='Please choose your time frame..'
                                options={timeFrames}
                                onInput={inputHandler}
                              />
                            <Button className='increment-btn' variant="warning" size="lg" block onClick={addExclude}>
                              Add Exclude
                             </Button>
                             {excludes.map(index => {
                            return <ExcludeItem 
                             key={index}
                             addExcludeHandler={() => handleExcludeSave(index)}
                             onInputHandler={inputHandler}
                             deleteExcludeHandler={() => handleExcludeRemove(index)} iId={index} />
                        }
                        )}
                        </Col>
                      </Row>
                      <Button  type='submit' className='submit-btn' size="lg" block onClick={handleSearch} > Search Meal Plan</Button>
                    
                    </Form>
                   
                </Card>
            </Container>
            <Container className='new-recipe-container plan-container' >
              <Card  border="secondary" className='recipe-form'>
                {isDailyPlan && dailyPlanData !== undefined  &&  <DailyPlan data={dailyPlanData} />}
              </Card>
            </Container>

        </div>
    )
}
export default NewMealPlan