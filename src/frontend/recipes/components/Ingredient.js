import React from 'react'
import {Card, Accordion,Button} from 'react-bootstrap'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import Input from '../../shared/components/FormElements/Input'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../shared/util/validators'

const Ingredient = props => {
    return(
    <Accordion className='accordion-item'>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.iId}>
                + Ingredient
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.iId}>
                <Card.Body className='accordion-card-item'>
                    <Input 
                        element='input'
                        type='text'
                        id='iName'
                        name='iName'
                        label='Name'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a ingredient name...'
                        placeholder='Please enter a Ingredient name...'
                        onInput={props.onInputHandler} />
                
                    <Input 
                        element='input'
                        type='number'
                        id='amount'
                        name='amount'
                        label='Amount'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter an amount...'
                        placeholder='Please enter an amount...'
                        onInput={props.onInputHandler} 
                    />
                    <Input 
                        element='input'
                        type='text'
                        id='measure'
                        name='measure'
                        label='Measure'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a measure...'
                        placeholder='Please enter a measure...'
                        onInput={props.onInputHandler}
                    />
                    <div className='div-buttons'>
                        <Button variant="success" onClick={props.addIngredientHandler}>Submit</Button>
                        <Button variant="danger" onClick={props.deleteIngredientHandler} >Remove  </Button>
                    </div>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
    </Accordion>
    )
}
export default Ingredient