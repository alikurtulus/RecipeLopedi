import React ,{useContext, useState, useEffect} from 'react'
import axios from 'axios'
import {Container,Form,Row,Col,Figure,Table,Card,ListGroup, Spinner,Badge, Accordion,Button} from 'react-bootstrap'
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

    const [formState,inputHandler, setFormData]= useForm({
      title:{
        value:"",
        isValid:false
      },
      image:{
        value:null,
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
      ingredients:[{
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
          }
      }
      ],
      instructions:[
          {
            content:{
                value:"",
                isValid:false
              }
          }
      ]
     

    },false)
    const [ingredients,setIngredients] = useState([])
    const [ingredientCount,setIngredientCount] = useState(0)
    const [instructionCount, setInstructionCount] = useState(0)
    const [instructions, setInstructions] = useState([])

        
    const addIngredient = () => {
        setIngredientCount(ingredientCount=> ingredientCount + 1)
        setIngredients(prev => [...prev,ingredientCount])
    }
    const addInstruction = () => {
        setInstructionCount(instructionCount => instructionCount + 1)
        setInstructions(prev => [...prev, instructionCount])
    }
    const handleIngredientRemove = (index) => {
        setIngredients(ingredients.filter(ingredient => ingredient !== index))
        setIngredientCount(ingredientCount => ingredientCount - 1)   
    }
    const handleInstructionRemove = (index) => {
        setInstructions(ingredients.filter(ingredient => ingredient !== index))
        setInstructionCount(ingredientCount => ingredientCount - 1)  
    }
    const handleSubmit =  (e) => {
        e.preventDefault()
        setFormData({...formState.inputs},false)
        

        try{
            console.log(formState.inputs)
            const formData = new FormData()
            const my_ingredients = new Array()
            const my_instructions = new Array()
        
            my_ingredients.push({name:formState.inputs.iName.value,amount:parseFloat(formState.inputs.amount.value),measure:formState.inputs.measure.value})
            console.log(my_ingredients)
           
            my_instructions.push({content:formState.inputs.content.value})
            
            formData.append('title',formState.inputs.title.value)
            formData.append('image',formState.inputs.image.value)
            formData.append('ingredients',JSON.stringify(my_ingredients))
            formData.append('instructions',JSON.stringify(my_instructions))
            formData.append('readyInMinutes',parseFloat(formState.inputs.readyInMinutes.value))
            formData.append('servings',parseFloat(formState.inputs.servings.value))
            formData.append('price',parseFloat(formState.inputs.price.value))
          
           
            console.log(formData.get('ingredients'))
            console.log(formData.get('instructions'))
            console.log(formData.get('image'))
            console.log(formData.get('price'))
            console.log(formData.get('servings'))
            console.log(formData.get('title'))
           
            const responseData =  axios.post(
                process.env.REACT_APP_BACKEND_URL+'/recipes/new',
                 formData,{
                 headers: {"Authorization" : `Bearer ${auth.token}`} })
        
            console.log(responseData)
            console.log('2g')
            
           
          
        }
        catch(err){
           console.log(err.message)
        }
    }

    return (
        <div className='recipe-main'>
            <h3>-</h3>
            <Container className='new-recipe-container' >
                
                <Card  border="secondary" className='recipe-form'>
                    <Form className='form-container' >
                        <Input 
                            element='input'
                            type='text'
                            id='title'
                            name='title'
                            label='Title'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a title...'
                            placeholder='Please enter a title...'
                            onInput={inputHandler} />
                        <Input 
                            element='input'
                            type='number'
                            id='readyInMinutes'
                            name='readyInMinutes'
                            label='ReadyInMinutes'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a readyInMinutes...'
                            placeholder='Please enter a readyInMinutes...'
                            onInput={inputHandler} />    
                        <ImageUpload
                                id='image' 
                                name='image'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please import an image file.'
                                onInput={inputHandler}
                                
                        />
                        <Button className='increment-btn' variant="warning" size="lg" block onClick={addIngredient}>
                            Add Ingredient
                        </Button>
                        {ingredients.map(index => {
                            return ( <Ingredient  key={index} onInputHandler={inputHandler} deleteIngredientHandler={() => handleIngredientRemove(index)} iId={index} />)
                        }
                        )}
                       
                        <Input 
                            element='input'
                            type='number'
                            id='servings'
                            name='servings'
                            label='Servings'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a servings...'
                            placeholder='Please enter a servings...'
                            onInput={inputHandler} />
                        <Input 
                            element='input'
                            type='number'
                            id='price'
                            name='price'
                            label='Price'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a price...'
                            placeholder='Please enter a price...'
                            onInput={inputHandler} />
                        <Button className='increment-btn' variant="warning" size="lg" block onClick={addInstruction}>
                            Add Instruction
                        </Button>
                        {instructions.map(index => {
                            return   <Instruction key={index} iId={index} onInputHandler={inputHandler} deleteInstruction={() => handleInstructionRemove(index)} />
                        })}
                    <Button  type='submit' className='submit-btn' size="lg" block  onClick={handleSubmit}>Add Recipe</Button>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}
export default NewRecipe