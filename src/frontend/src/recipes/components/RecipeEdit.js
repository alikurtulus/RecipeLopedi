import React ,{useContext, useState ,useEffect} from 'react'
import axios from 'axios'
import { useParams, useLocation} from "react-router";
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


 const RecipeEdit = props => {
    const auth  = useContext(AuthContext)
    const history = useHistory()
    const location = useLocation()
    console.log(location.state.data)
    const [selectedRecipe,setSelectedRecipe] = useState(location.state.data)
    
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
    const [ingredients,setIngredients] = useState(location.state.data.ingredients)
    const [ingredientCount,setIngredientCount] = useState(location.state.data.ingredients.length)
    const [instructionCount, setInstructionCount] = useState(location.state.data.instructions.length)
    const [instructions, setInstructions] = useState(location.state.data.instructions)
    const [ingredientData,setIngredientData] = useState(location.state.data.ingredients)
    const [instructionData, setInstructionData] = useState(location.state.data.instructions)
    const [show, setShow] = useState(false);                                 //Error modal
    const handleClose = () => setShow(false);                                // We  use this for closing the modal.
    const handleShow = () => setShow(true);                                  // We use this for showing the modal.
    const [errorMessage,setErrorMessage] = useState('')

    console.log(selectedRecipe)
    const addIngredient = () => {
      
        setIngredients(prev => [...prev,ingredientCount])
        setIngredientCount(ingredientCount=> ingredientCount + 1)
     
    }
    const addInstruction = () => {
    
        setInstructions(prev => [...prev, instructionCount])
        setInstructionCount(instructionCount => instructionCount + 1)
    }
    const handleIngredientRemove = (index) => {
        setIngredients(ingredients.filter(ingredient => ingredient !== index))
        setIngredientCount(ingredientCount => ingredientCount - 1)   
    }
    const handleInstructionRemove = (index) => {
        setInstructions(instructions.filter(instruction => instruction !== index))
        setInstructionCount(instructionCount => instructionCount - 1)  
    }
    const handleSaveIngredient = (index) => {

        let  newArr = [...ingredientData]
        newArr[index] = {name:formState.inputs.iName.value,amount:formState.inputs.amount.value,measure:formState.inputs.measure.value}
         setIngredientData(newArr)
        console.log(ingredientData)
    }
    const handleSaveInstruction = (index) => {
      let newArr = [...instructionData]
      newArr[index] = {content:formState.inputs.content.value}
      setInstructionData(newArr)
      console.log(instructionData)
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
            
            const responseData = await axios.put(
                process.env.REACT_APP_BACKEND_URL+`/recipes/${selectedRecipe.id}`,
                 formData,{
                 headers: {Authorization : `Bearer ${auth.token}`} })
                 console.log(responseData)
            if(responseData) {
                history.push('/recipes/all')
            }
            else{
                setErrorMessage(err.response.data.message)
                setShow(true);
            }
           

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
                                initialValue={selectedRecipe.title}
                                initialValid={true}
                                
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
                                initialValue={selectedRecipe.readyInMinutes}
                                initialValid={true}
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
                                initialValue={selectedRecipe.servings}
                                initialValid={true}
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
                                initialValue={selectedRecipe.price}
                                initialValid={true}
                            />
                        <Button className='increment-btn' variant="warning" size="lg" block onClick={addIngredient}>
                            Add Ingredient
                        </Button>
                        {ingredients.map(index => {
                            return <Ingredient 
                             key={index}
                             iId={index}
                             initialValue={selectedRecipe.ingredients}
                             initialValid={true}
                             addIngredientHandler={() => handleSaveIngredient(index)}
                             onInputHandler={inputHandler}
                             deleteIngredientHandler={() => handleIngredientRemove(index)} iId={index} />
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
                            return   <Instruction 
                            key={index} iId={index}
                            onInputHandler={inputHandler}
                            addInstructionHandler = {() => handleSaveInstruction(index)}
                            deleteInstruction={() => handleInstructionRemove(index)} />
                        })}
                        </Col>
                      
                      </Row>
                      <Button  type='submit' className='submit-btn' size="lg" block >Update Recipe</Button>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}
export default RecipeEdit