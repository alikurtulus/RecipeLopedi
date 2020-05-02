import React,{useEffect,useState} from 'react'
import {Container,Col,Row,Form,Button} from 'react-bootstrap'
import axios from 'axios'
import Input from '../../shared/components/FormElements/Input'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import {useForm} from '../../shared/hooks/form-hooks'
import {AuthContext} from '../../shared/context/auth-context'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../shared/util/validators'

const genderType = ['Choose','Female','Male','Other']
 const  UserEdit = () =>{
    const [formState,inputHandler, setFormData]= useForm({
        email:{
            value:'',
            isValid:false
        },
        username:{
            value:'',
            isValid:false
          },
        password:{
            value:'',
            isValid:false
        },
        passwordConfirmation:{
            value:'',
            isValid:false
        },
        age:{
            value:'',
            isValid:false
        },
        gender:{
            value:'',
            isValid:false
        },
        image:{
            value:null,
            isValid:false
        }
      },false)
    return (
        <Container>
            <Form>
                <Row>
                    <Col sm={6}>
                            <Input 
                                element='input'
                                type='email'
                                id='email'
                                name='email'
                                label='Email'
                                validators={[VALIDATOR_EMAIL()]}
                                errorText='Please enter an email...'
                                placeholder='Please enter an email...'
                                onInput={inputHandler}
                            />
                            <Input 
                                element='input'
                                type='text'
                                id='username'
                                name='username'
                                label='Username'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please enter an username'
                                placeholder='Please enter an username...'
                                onInput={inputHandler}
                            />
                            <Input 
                                element='input'
                                type='password'
                                id='password'
                                name='password'
                                validators={[VALIDATOR_MINLENGTH(6)]}
                                label='Password'
                                errorText= 'Please enter a password...' 
                                placeholder='Please enter a password...'
                                onInput={inputHandler}
                            />
                            <Input 
                                element='input'
                                type='password'
                                validators={[VALIDATOR_MINLENGTH(6)]}
                                id='passwordConfirmation'
                                name='passwordConfirmation'
                                label='Password Confirmation'
                                errorText='Please enter a passsword with min 6 characters'
                                placeholder='Please enter confirm your password...'
                                onInput={inputHandler}
                            />
                            <Input
                                element='input'
                                type='number'
                                id='age'
                                label='Age'
                                name='age'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please enter your age...'
                                placeholder='Please enter your age...'
                                onInput={inputHandler}
                            />
                        </Col>
                        <Col sm={6}>
                            <ImageUpload
                                id='image' 
                                name='image'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please import an image file.'
                                onInput={inputHandler}
                            />
                            <Input
                                element='select'
                                id='gender'
                                label='Gender'
                                name='gender'
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText='Please choose your gender..'
                                placeholder='Please choose your gender..'
                                options={genderType}
                                onInput={inputHandler}
                            />
                            <div className='btns-container'>
                                <Button variant='success' className='btn-button'>Update Profile</Button>
                            </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
export default UserEdit