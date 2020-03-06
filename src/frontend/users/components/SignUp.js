import React ,{useContext} from 'react'
import axios from 'axios'
import {Form,Container,InputGroup, Button, FormControl, ProgressBar } from 'react-bootstrap'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import Input from '../../shared/components/FormElements/Input'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../shared/util/validators'

const genderType = ['Choose','Female','Male','Other']

const singUp = props => {
    
    const handleChange = event => {
      console.log(event.target.value)
    }
   
 return (
        <Container>
            <Form >
                <Input 
                    element='input'
                    type='text'
                    id='username'
                    name='username'
                    label='Username'
                    errorText='Please enter an username'
                    placeholder='Please enter an username...'
                    validators={[VALIDATOR_REQUIRE()]}
                    onChange={handleChange}
                    
                />
                <Input 
                    element='input'
                    type='email'
                    id='email'
                    name='email'
                    label='Email'
                    errorText='Please enter an email'
                    placeholder='Please enter an email...'
                    validators={[VALIDATOR_EMAIL()]}
                    onChange={handleChange}
                    
                />
                <Input 
                    element='input'
                    type='password'
                    id='password'
                    name='password'
                    label='Password'
                    errorText='Please enter a password'
                    placeholder='Please enter a password...'
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    onChange={handleChange}
                  
                />
                <Input 
                    element='input'
                    type='password'
                    id='passwordConfirmation'
                    name='passwordConfirmation'
                    label='Password Confirmation'
                    errorText='Please enter your password confirmation'
                    placeholder='Please enter confirm your password...'
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    onChange={handleChange}
                        
                />
                <Input
                    element='input'
                    type='number'
                    id='age'
                    label='Age'
                    name='age'
                    errorText='Please enter your age'
                    placeholder='Please enter your age...'
                    validators={[VALIDATOR_REQUIRE()]}
                    onChange={handleChange}
                   
                 />
                <Input
                    element='select'
                    id='gender'
                    label='Gender'
                    name='gender'
                    errorText='Please enter your age'
                    placeholder='Please enter your age...'
                    options={genderType}
                    validators={[VALIDATOR_REQUIRE()]}
                    onChange={handleChange}
                   
                  />
                   
                <ImageUpload
                    id='image' 
                    name='image'
                    errorText='Please import an image file.'
                    validators={[VALIDATOR_REQUIRE()]}
                          
                />
                <Button variant="primary" type="submit">
                 Submit
                </Button>
            </Form>
        </Container>
   
 )
}
export default singUp