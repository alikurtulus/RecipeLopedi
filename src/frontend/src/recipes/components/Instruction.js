import React,{useState} from 'react'
import {Card, Accordion,Button,Image} from 'react-bootstrap'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import Input from '../../shared/components/FormElements/Input'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../shared/util/validators'
import plusIcon from '../../assets/plus.png'
import minusIcon from '../../assets/minus.png'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import completedIcon from '../../assets/submit.png'

const CustomToggle = ({isSaved,eventKey }) => {
    const [isClicked,setIsClicked] = useState(false)
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      {
          setIsClicked(!isClicked)
      }
    );
  
    return (
        <div className='accordion-title-main-container' onClick={decoratedOnClick}>
            <div className='accordion-title-icon-container'>
                <div className='accordion-title-icon'>
                <Image src={!isClicked ? plusIcon : minusIcon} className='accordion-title-icon-img' />
                </div>
                <div className='accordion-title'>
                    Instruction
                </div>
            </div>
            <div className='accordion-title-completed-icon'>
                {isSaved  ?  <Image src={completedIcon} className='accordion-title-icon-img' /> : ''}
            </div>
        </div>
    );
  }

const Instruction = props => {
   
   
    return(
        <Accordion className='accordion-item' >
                <Card>
                    <Card.Header>
                        <CustomToggle eventKey={props.iId} isSaved={props.isSaved}></CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={props.iId}>
                        <Card.Body>
                            <Input 
                                element='textarea'
                                type='content'
                                id='content'
                                name='content'
                                label='Content'
                                initialValue={props.iId.content}
                                initialValid={true}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please enter a content...'
                                placeholder='Please enter a content...'
                                onInput={props.onInputHandler} />
                                
                            <div className='div-buttons'>
                                <Button variant="success" className='btn-left-submit' onClick={props.addInstructionHandler}>Submit</Button>
                                <Button variant="danger" className='btn-right-remove' onClick={props.deleteInstruction} >Remove  </Button>       
                            </div>       
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>       
        </Accordion>

    )

}
export default Instruction