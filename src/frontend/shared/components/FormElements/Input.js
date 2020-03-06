import React from 'react'
import {Form,Container, Button} from 'react-bootstrap'

const input = props => {

    let element 
    if(props.element === 'input'){
       element = 
       (<Form.Group id={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control as={props.element} type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
            <Form.Text className="text-muted">
              {props.errorText}
            </Form.Text>
        </Form.Group>
       ) 
    }
    else if(props.element === 'select'){
        element = (
            <Form.Group id={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control as={props.element} onChange={props.onChange}>
             {props.options.map((opt,index)=> 
             <option key={index} value={opt}>{opt}</option>
                )}
            </Form.Control>
          </Form.Group>
        )
    }
    else if(props.element === 'textarea'){
        element = (
            <Form.Group id={props.id}>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control as={props.element} rows={props.rows} onChange={props.onChange} />
            </Form.Group>)
    }
    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    )
}

export default input