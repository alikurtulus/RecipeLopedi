import React, {useReducer, useEffect}from 'react'
import {Form,Container, Button} from 'react-bootstrap'
import {validate} from '../../util/validators'
import './Input.css'
const inputReducer = (state, action) => {
    switch(action.type){
      case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid:validate(action.val,action.validators)
      };
      case 'TOUCH':
        return {
         ...state,
         isTouched:true
      }
  
      default:
      return state;
    }
  }

const input = props => {
    const [inputState, dispatch] = useReducer(inputReducer,{
        value:props.initialValue || '',
        isValid:props.initialValid  || false,
        isTouched: false
      })
      const {id, onInput} = props
      const {value, isValid} = inputState
      useEffect(() => {
        onInput(id, value, isValid)
      },[id, value, isValid, onInput])
    
      const changeHandler = event => {
        dispatch({
                  type:'CHANGE',
                  val:event.target.value,
                  validators:props.validators
                })
      }
      const touchHandler = () => {
        dispatch({
          type:'TOUCH'
        })
      }
   
    let element
    if(props.element === 'input'){
       element = 
       (    <Form.Group id={props.id} >
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                    id={props.id}
                    as={props.element}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                        />
                <Form.Text className="text-muted">
                {!inputState.isValid && inputState.isTouched && <p className='errorMesage'>{props.errorText} </p>}
                </Form.Text>
            </Form.Group>            
       ) 
    }
    else if(props.element === 'select'){
        element = (

            <Form.Group id={props.id} >
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                            id={props.id} 
                            as={props.element}
                            onChange={changeHandler}
                            onBlur={touchHandler}
                            value={inputState.value}
                            >
                {props.options.map((opt,index)=> 
                <option key={index} value={opt}>{opt}</option>
                    )}
                </Form.Control>
                <Form.Text className="text-muted">
                {!inputState.isValid && inputState.isTouched && <p className='errorMesage'>{props.errorText} </p>}
                </Form.Text>
            </Form.Group>     
        )
    }
    else if(props.element === 'textarea'){
        element = (
        
                <Form.Group id={props.id} >
                    <Form.Label>{props.label}</Form.Label>
                    <Form.Control
                           id={props.id}
                           as={props.element}
                           rows={props.rows}
                           onChange={changeHandler}
                           onBlur={touchHandler}
                           value={inputState.value} />
                   <Form.Text className="text-muted">
                {!inputState.isValid && inputState.isTouched && <p className='errorMesage'>{props.errorText} </p>}
                </Form.Text>       
                </Form.Group>             
           )
    }
    return (
        <React.Fragment>
           
            {element}
            
           
             
        </React.Fragment>
    )
}

export default input