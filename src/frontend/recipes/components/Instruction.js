import React from 'react'
import {Card, Accordion,Button} from 'react-bootstrap'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import Input from '../../shared/components/FormElements/Input'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../shared/util/validators'


const Instruction = props => {
    return(
        <Accordion className='accordion-item' >
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={props.iId}>
                    + Instruction
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={props.iId}>
                        <Card.Body>
                            <Input 
                                element='textarea'
                                type='content'
                                id='content'
                                name='content'
                                label='Content'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please enter a content...'
                                placeholder='Please enter a content...'
                                onInput={props.onInputHandler} />
                                
                            <div className='div-buttons'>
                                <Button variant="success" onClick={props.addInstructionHandler}>Submit</Button>
                                <Button variant="danger" onClick={props.deleteInstruction} >Remove  </Button>       
                            </div>       
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>       
        </Accordion>

    )

}
export default Instruction