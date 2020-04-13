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


 const NewRecipe = props => {

    const [formState,inputHandler, setFormData]= useForm()
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
    return (
        <div className='recipe-main'>
            <h3>-</h3>
            <Container className='new-recipe-container' >
                
                <Card  border="secondary" className='recipe-form'>
                    <Form className='form-container'>
                        <Input 
                            element='input'
                            type='title'
                            id='title'
                            name='title'
                            label='Title'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a title...'
                            placeholder='Please enter a title...'
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
                            type='readyInMinutes'
                            id='readyInMinutes'
                            name='readyInMinutes'
                            label='ReadyInMinutes'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a readyInMinutes...'
                            placeholder='Please enter a readyInMinutes...'
                            onInput={inputHandler} />
                        <Input 
                            element='input'
                            type='servings'
                            id='servings'
                            name='servings'
                            label='Servings'
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Please enter a servings...'
                            placeholder='Please enter a servings...'
                            onInput={inputHandler} />
                        <Input 
                            element='input'
                            type='price'
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
                    <Button className='submit-btn' size="lg" block onClick={addInstruction} >Add Recipe</Button>
                    </Form>
                </Card>

            </Container>
        </div>
    )
}
export default NewRecipe