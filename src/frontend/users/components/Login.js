import React, {useState, useContext} from 'react'
import {Form,Container, Button} from 'react-bootstrap'
import Input from '../../shared/components/FormElements/Input'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../shared/util/validators'


const login = props => {
  const handleChange = event => {
    console.log(event.target.value)
  }
  

  return(
       <Container>
         <Form >
          <Input
               element='input'
               id='email'
               label='Email address'
               type="email"
               placeholder="Enter email"
               errorText='Please enter your email'
               validators={[VALIDATOR_EMAIL()]}
               onChange={handleChange}
               
          />
          <Input 
              element='input'
              id='password'
              label='Password'
              type='password'
              placeholder="Password"
              errorText='Please enter your password'
              validators={[VALIDATOR_MINLENGTH(6)]}
              onChange={handleChange}
           

          />
           <Button variant="primary"  type="submit">
            Submit
           </Button>
        </Form>
       </Container>
       
   )
}
export default login