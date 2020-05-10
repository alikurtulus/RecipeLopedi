import React ,{useContext, useState ,useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {Container,Form,Row,Col,Card,Modal,Button} from 'react-bootstrap'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import Input from '../../shared/components/FormElements/Input'
import {useForm} from '../../shared/hooks/form-hooks'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../shared/util/validators'
import './NewRecipe.css'
import Ingredient from './Ingredient'
import Instruction  from './Instruction'
import {AuthContext} from '../../shared/context/auth-context'


 const NewRecipe = props => {
    const auth  = useContext(AuthContext)
    const history = useHistory()
    const [formState,inputHandler, setFormData]= useForm({
      title:{
        value:"",
        isValid:false
      },
      image:{
        value:null,
        isValid:false
      },
      name:{
        value:"",
        isValid:false
      },
      amount:{
        value:"",
        isValid:false
      },
      measure:{
        value:"",
        isValid:false
      },
      content:{
        value:"",
        isValid:false
      },
      readyInMinutes:{
        value:"",
        isValid:false
      },
      servings:{
        value:"",
        isValid:false
      },
      price:{
        value:"",
        isValid:false
      },
    },false)
    const [ingredients,setIngredients] = useState([])
    const [ingredientCount,setIngredientCount] = useState(0)
    const [instructionCount, setInstructionCount] = useState(0)
    const [instructions, setInstructions] = useState([])
    const [ingredientData,setIngredientData] = useState([])
    const [instructionData, setInstructionData] = useState([])
    const [show, setShow] = useState(false);                                 //Error modal
    const handleClose = () => setShow(false);                                // We  use this for closing the modal.
    const handleShow = () => setShow(true);                                  // We use this for showing the modal.
    const [errorMessage,setErrorMessage] = useState('')
    const [isIngredientSaved,setIsIngredietSaved] = useState([])
    const [isInstructionSaved,setIsInstructionSaved] = useState([])

        
    const addIngredient = () => {
      
        setIngredients(prev => [...prev,ingredientCount])
        setIngredientCount(ingredientCount=> ingredientCount + 1)
       
    }
    const addInstruction = () => {
    
        setInstructions(prev => [...prev, instructionCount])
        setInstructionCount(instructionCount => instructionCount + 1)
    }
    const handleIngredientRemove = (index) => {
      let isSavedArr = [...isIngredientSaved]
        setIngredients(ingredients.filter(ingredient => ingredient !== index))
        setIngredientCount(ingredientCount => ingredientCount - 1)   
        isSavedArr[index] = false
        setIsIngredietSaved(isSavedArr)  
    }
    const handleInstructionRemove = (index) => {
        let isSavedArr= [...isInstructionSaved]
        setInstructions(instructions.filter(instruction => instruction !== index))
        setInstructionCount(instructionCount => instructionCount - 1)
        isSavedArr[index]= false
        setIsInstructionSaved(isSavedArr)
      
    }
    const handleSaveIngredient = (index) => {

        let  newArr = [...ingredientData]
        let isSavedArr = [...isIngredientSaved]


        if(formState.inputs.iName.value !== '' && formState.inputs.amount.value !== '' && formState.inputs.measure.value !== ''  ){
          newArr[index] = {name:formState.inputs.iName.value,amount:formState.inputs.amount.value,measure:formState.inputs.measure.value}
          setIngredientData(newArr)
          isSavedArr[index] = true
          setIsIngredietSaved(isSavedArr)
        }
        else{
          setErrorMessage('Make sure fill all inputs ...')
          isSavedArr[index] = false
          setIsIngredietSaved(isSavedArr)
          setShow(true);
        }
        
        
    }
    const handleSaveInstruction = (index) => {
      let newArr = [...instructionData]
      let isSavedArr= [...isInstructionSaved]

      if(formState.inputs.content.value !== ''){
        newArr[index] = {content:formState.inputs.content.value}
        setInstructionData(newArr)
        isSavedArr[index]= true
        setIsInstructionSaved(isSavedArr)
      }
      else{
        setErrorMessage('Make sure fill all inputs ...')
        isSavedArr[index]= false
        setIsInstructionSaved(isSavedArr)
        setShow(true);
      }

     
    }
    const handleSubmit =  async e => {

        e.preventDefault()     
        try{

            const formData = new FormData()
            formData.append('title',formState.inputs.title.value)
            formData.append('image',formState.inputs.image.value)
            formData.append('ingredients',JSON.stringify(ingredientData))
            formData.append("instructions",JSON.stringify(instructionData))
            formData.append('readyInMinutes',formState.inputs.readyInMinutes.value)
            formData.append('servings',formState.inputs.servings.value)
            formData.append('price',formState.inputs.price.value)
            formData.append('creator',auth.userId)
            
            const responseData = await axios.post(
                process.env.REACT_APP_BACKEND_URL+'/recipes/new',
                 formData,{
                 headers: {Authorization : `Bearer ${auth.token}`} })
                 console.log(responseData)
            
            history.push('/recipes/all')

          }

        catch(err){
          console.log(err)
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
                            element='input'
                            type='number'
                            id='readyInMinutes'
                            name='readyInMinutes'
                            label='ReadyInMinutes'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a readyInMinutes...'
                            placeholder='Please enter a readyInMinutes...'
                            onInput={inputHandler}
                        /> 
                        <Input 
                            element='input'
                            type='number'
                            id='servings'
                            name='servings'
                            label='Servings'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a servings...'
                            placeholder='Please enter a servings...'
                            onInput={inputHandler}
                        />
                        <Input 
                            element='input'
                            type='number'
                            id='price'
                            name='price'
                            label='Price'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a price...'
                            placeholder='Please enter a price...'
                            onInput={inputHandler}
                        />
                        <Button className='increment-btn' variant="warning" size="lg" block onClick={addIngredient}>
                            Add Ingredient
                        </Button>
                        {ingredients.map(index => {
                            return  <Ingredient 
                            key={index}
                            addIngredientHandler={() => handleSaveIngredient(index)}
                            onInputHandler={inputHandler}
                            deleteIngredientHandler={() => handleIngredientRemove(index)} iId={index} 
                            isSaved = {isIngredientSaved[index]}
                        />
                           
                        }
                        )}
                        </Col>
                        <Col sm={6}>
                          <ImageUpload
                                  id='image' 
                                  name='image'
                                  validators={[VALIDATOR_REQUIRE()]}
                                  errorText='Please import an image file.'
                                  onInput={inputHandler}
                          />
                          <Button className='increment-btn' variant="warning" size="lg" block onClick={addInstruction}>
                              Add Instruction
                          </Button>
                          {instructions.map(index => {
                              return  <Instruction 
                              key={index} iId={index}
                              onInputHandler={inputHandler}
                              addInstructionHandler = {() => handleSaveInstruction(index)}
                              deleteInstruction={() => handleInstructionRemove(index)} 
                              isSaved = {isInstructionSaved[index]}
                              />
                              
                          })}
                        </Col>
                      
                      </Row>
                      <Button  type='submit' className='submit-btn' size="lg" block >Add Recipe</Button>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}
export default NewRecipe