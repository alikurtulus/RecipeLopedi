import React,{useState} from 'react'
import {Card, Accordion,Button,Image} from 'react-bootstrap'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import Input from '../../shared/components/FormElements/Input'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../shared/util/validators'
import plusIcon from '../../assets/plus.png'
import minusIcon from '../../assets/minus.png'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import completedIcon from '../../assets/submit.png'

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
                    Ingredient
                </div>
            </div>
            <div className='accordion-title-completed-icon'>
                {isSaved  ?  <Image src={completedIcon} className='accordion-title-icon-img' /> : ''}
            </div>
        </div>
    );
  }


const Ingredient = props => {
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
                        id='iName'
                        name='iName'
                        label='Name'
                        validators={[VALIDATOR_REQUIRE()]}
                        initialValue={props.iId.name}
                        initialValid={true}
                        errorText='Please enter a ingredient name...'
                        placeholder='Please enter a Ingredient name...'
                        onInput={props.onInputHandler} />
                
                    <Input 
                        element='input'
                        type='number'
                        id='amount'
                        name='amount'
                        label='Amount'
                        initialValue={props.iId.amount}
                        initialValid={true}
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
                        initialValue={props.iId.measure}
                        initialValid={true}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a measure...'
                        placeholder='Please enter a measure...'
                        onInput={props.onInputHandler}
                    />
                    <div className='div-buttons'>
                        <Button variant="success" className='btn-left-submit' onClick={props.addIngredientHandler}>Submit</Button>
                        <Button variant="danger" className='btn-right-remove' onClick={props.deleteIngredientHandler} >Remove  </Button>
                    </div>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
    </Accordion>
    )
}
export default Ingredient