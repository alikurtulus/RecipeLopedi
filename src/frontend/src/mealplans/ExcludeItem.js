import React,{useState} from 'react'
import {Card, Accordion,Button,Image} from 'react-bootstrap'
import Input from '../../src/shared/components/FormElements/Input'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../shared/util/validators'
import plusIcon from '../assets/plus.png'
import minusIcon from '../assets/minus.png'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import completedIcon from '../assets/submit.png'



const CustomToggle = ({isSaved, eventKey }) => {
    const [isClicked,setIsClicked] = useState(false)
    console.log(isSaved)
   
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
                    Exclude
                </div>
            </div>
            <div className='accordion-title-completed-icon'>
                {isSaved  ?  <Image src={completedIcon} className='accordion-title-icon-img' /> : ''}
            </div>
        </div>
    );
  }



const ExcludeItem = props => {
    return(
    <Accordion className='accordion-item'>
            <Card>
                <Card.Header>
                    <CustomToggle eventKey={props.iId} isSaved={props.isSaved} ></CustomToggle>
                </Card.Header>
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