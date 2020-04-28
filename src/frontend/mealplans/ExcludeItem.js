import React from 'react'
import {Card, Accordion,Button} from 'react-bootstrap'
import ImageUpload from '../../frontend/shared/components/FormElements/ImageUpload'
import Input from '../../frontend/shared/components/FormElements/Input'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../frontend/shared/util/validators'



const ExcludeItem = props => {
    return(
    <Accordion className='accordion-item'>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.iId}>
                + Exclude
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.iId}>
                <Card.Body className='accordion-card-item'>
                    <Input 
                        element='input'
                        type='text'
                        id='exclude'
                        name='exclude'
                        label='Exclude'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter an exclude name...'
                        placeholder='Please enter an exclude name...'
                        onInput={props.onInputHandler} />
                
                    <div className='div-buttons'>
                        <Button variant="success" className='btn-left-submit' onClick={props.addExcludeHandler}>Submit</Button>
                        <Button variant="danger" className='btn-right-remove' onClick={props.deleteExcludeHandler} >Remove  </Button>
                    </div>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
    </Accordion>
    )
}
export default ExcludeItem