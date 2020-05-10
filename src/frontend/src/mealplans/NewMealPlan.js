import React,{useContext,useState,useEffect} from 'react'
import {Container,Form,Row,Col,Card,Modal,Button,Dropdown} from 'react-bootstrap'
import Input from '../../src/shared/components/FormElements/Input'
import {useForm} from '../../src/shared/hooks/form-hooks'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../shared/util/validators'
import {AuthContext} from '../../src/shared/context/auth-context'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../recipes/components/NewRecipe.css'
import ExcludeItem from '../mealplans/ExcludeItem'
import DailyPlan from './DailyPlan'
import WeeklyPlan from './WeeklyPlan'
import qs from 'qs'

const diets = ['Choose your diet','Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Pescetarian','Paleo','Primal','Whole30']
const timeFrames = ['Choose timeframe','Day','Week']
const NewMealPlan = props => {
    const auth  = useContext(AuthContext)
    const history = useHistory()
    const [excludes,setExcludes] = useState([])
    const [excludeCount,setExcludeCount] = useState(0)
    const [excludeData, setExcludeData] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [isDaily,setIsDaily] = useState(false)
    const [isWeekly,setIsWeekly] = useState(false)
    const [weeklyPlanData,setWeeklyPlanData] = useState({})
    const [dailyPlanData,setDailyPlanData] = useState({})
    const [isSearched,setIsSearched] = useState(false)
    const [mid,setMealPlanId] = useState('')
    const [isAdded,setIsAdded] = useState(true)
    const [isExcludeSaved,setExcludeSaved] = useState([])
    const [show, setShow] = useState(false);                                 //Error modal
    const handleClose = () => setShow(false);                                // We  use this for closing the modal.
    const handleShow = () => setShow(true);                                 // We use this for showing the modal.
    const [errorMessage,setErrorMessage] = useState('')
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
        value:"Gluten Free",
        isValid:false
      },
      timeFrame:{
          value:"Day",
          isValid:false
      },
      exclude:{
        value:"",
        isValid:false
    
      }
     
    },false)
    const handleSubmit = async e => {
        e.preventDefault()
   
        try{
           
           if(isAdded){
            let mainMealData 
            if(formState.inputs.timeFrame.value === 'Day'){
              mainMealData = dailyPlanData
            }
            else{
              mainMealData = weeklyPlanData
            }
           let data = {
             title:formState.inputs.title.value,
             date:startDate,
             timeFrame:formState.inputs.timeFrame.value,
             targetCalories:formState.inputs.targetCalories.value,
             diet:formState.inputs.diet.value,
             exclude:excludeData.join(),
             myPlan:mainMealData,
             creator:auth.userId
 
           }
           try{  const responseData = await axios.post(
             process.env.REACT_APP_BACKEND_URL+'/mealplans/new',
             data,{
              headers: {Authorization : `Bearer ${auth.token}`} })
              console.log(responseData)
              setMealPlanId(responseData.data.mealplan.id)
             
              history.push('/mealplans/all')  
             }
              catch(err){
               setErrorMessage(err.message)
               setShow(true);
           }
           }
           else{
            try{ 
               const responseData = await axios.delete(
               process.env.REACT_APP_BACKEND_URL+ `/mealplans/${mid}`,{
               headers: {Authorization : `Bearer ${auth.token}`} })
              
               
            
              }
               catch(err){
                setErrorMessage(err.message)
                setShow(true);
            }
           }
        }
        catch(err){
          setErrorMessage(err.message)
          setShow(true);
        }
    }
    const addExclude = () => {
        setExcludes(prev => [...prev,excludeCount])
        setExcludeCount(excludeCount=> excludeCount + 1)
    }
    const handleExcludeRemove = (index) => {
        let isSavedArr = [...isExcludeSaved]
        setExcludes(excludes.filter(exclude => exclude !== index))
        setExcludeCount(excludeCount => excludeCount - 1)
        isSavedArr[index]= false
        setExcludeSaved(isSavedArr)
    }
    const handleExcludeSave = (index) => {
           
        let  newArr = [...excludeData]
        let isSavedArr = [...isExcludeSaved]
        if(formState.inputs.exclude.value !== ''){
          newArr[index] = formState.inputs.exclude.value
          setExcludeData(newArr)
          isSavedArr[index] = true
          setExcludeSaved(isSavedArr)
        }
        else{
          setErrorMessage('Make sure fill all inputs ...')
          isSavedArr[index] = false
          setExcludeSaved(isSavedArr)
          setShow(true);

        }
       
        console.log(excludeData)
    }
    const handleSearch = async (e) => {
        e.preventDefault()
        let myTimeFrame = formState.inputs.timeFrame.value
        let myDiet = formState.inputs.diet.value
        let myTargetCalories = formState.inputs.targetCalories.value
        let myExcludes = excludeData.join()
        try{
          const responseData = await axios.get(`https://api.spoonacular.com/mealplanner/generate?timeFrame=${myTimeFrame}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&diet=${myDiet}&targetCalories=${myTargetCalories}&exclude=${myExcludes}`)
          console.log(responseData)
          if(responseData.data.meals){
              setDailyPlanData(responseData.data)
              setIsDaily(true)
              setIsWeekly(false)
          }
          else{
              setIsWeekly(true)
              setIsDaily(false)
              setWeeklyPlanData(responseData.data)
          }
          setIsSearched(true)
        }
        catch(err){
          setErrorMessage(err.response.data.message)
          setShow(true);
        }

    }
   
    return (
        <div className='recipe-main'>
            <h3>-</h3>
            {show && <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Error Message</Modal.Title>
              </Modal.Header>
                  <Modal.Body>{errorMessage}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>} 
         
            <Container className='new-recipe-container' >
                <Card  border="secondary" className='recipe-form'>
                    <Form className='form-container' onSubmit={handleSubmit} >
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
                            <div className='btn-date-container' >
                                <Form.Group controlId="exampleForm.SelectCustom" className='date-picker'>
                                    <Form.Label>Date</Form.Label>
                                    <DatePicker
                                        showPopperArrow={false}
                                        selected={startDate}
                                        onChange={date => setStartDate(date)} 
                                    />
                                </Form.Group>
                              {isSearched && auth.token &&
                               <Button  type='submit' variant={isAdded ? 'success' : 'danger'} size="lg">
                                {isAdded ? ' Add Meal Plan' : 'Remove Meal Plan'}
                               </Button> } 
                            </div>
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
                             deleteExcludeHandler={() => handleExcludeRemove(index)} iId={index}
                             isSaved={isExcludeSaved[index]}
                              />
                        }
                        )}
                        </Col>
                      </Row>
                      <Button   className='submit-btn' size="lg" block onClick={handleSearch} > Search Meal Plan</Button>
                    
                    </Form>
                   
                </Card>
            </Container>
            {isSearched && 
              <Container className='new-recipe-container plan-container' >
                <Card  border="secondary" className='recipe-form'>
                  {isDaily && dailyPlanData !== undefined  &&  <DailyPlan data={dailyPlanData} />}
                  {isWeekly && weeklyPlanData !== undefined && <WeeklyPlan data={weeklyPlanData} week={true} /> }
                </Card>
              </Container>
            }
        </div>
    )
}
export default NewMealPlan