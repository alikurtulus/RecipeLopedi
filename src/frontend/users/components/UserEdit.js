import React,{useContext,useEffect,useState} from 'react'
import {Container,Col,Row,Form,Button,Spinner,Modal} from 'react-bootstrap'
import axios from 'axios'
import Input from '../../shared/components/FormElements/Input'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import {useForm} from '../../shared/hooks/form-hooks'
import {AuthContext} from '../../shared/context/auth-context'
import {VALIDATOR_MINLENGTH,VALIDATOR_EMAIL, VALIDATOR_REQUIRE}  from '../../shared/util/validators'

const genderType = ['Choose','Female','Male','Other']
 const  UserEdit = props =>{
    const auth  = useContext(AuthContext)
    const [errorMsg,setErrorMsg] = useState('')
    const [show, setShow] = useState(false);                                 //Error modal
    const handleClose = () => setShow(false);                                // We  use this for closing the modal.
    const handleShow = () => setShow(true);                                  // We use this for showing the modal.
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
   

    const handleSubmit = async (e) => {
        e.preventDefault()
      
        try{
            const formData = new FormData()
           formData.append('id',auth.userId)
           formData.append('email',formState.inputs.email.value)
           formData.append('username',formState.inputs.username.value)
           formData.append('age',formState.inputs.age.value)
           formData.append('password',formState.inputs.password.value)
           formData.append('passwordConfirmation',formState.inputs.passwordConfirmation.value)
           formData.append('gender',formState.inputs.gender.value)
           formData.append('image',formState.inputs.image.value)
         
           if(formState.inputs.password.value !== formState.inputs.passwordConfirmation.value){
            setErrorMsg('Password does not match')
           }
        
            const responseData = await axios.put(process.env.REACT_APP_BACKEND_URL+`/users/user/update`,formData,{
                headers: {Authorization : `Bearer ${auth.token}`} })
                console.log(responseData)
                props.onUpdateUser(responseData.data.user)
            
        }
        catch(err){
            
            setShow(true);
            setErrorMsg(err.response.data.message)
         
        }
    }

    return (

        <Container>
              {show && <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
              </Modal.Header>
              <Modal.Body>{errorMsg}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>} 
          
              <Form >
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
                                    placeholder={props.data.email}
                                    onInput={inputHandler}
                                    initialValue={props.data.email}
                                    initialValid={true}
                                />
                                <Input 
                                    element='input'
                                    type='text'
                                    id='username'
                                    name='username'
                                    label='Username'
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText='Please enter an username'
                                    placeholder={props.data.username}
                                    onInput={inputHandler}
                                    initialValue={props.data.username}
                                    initialValid={true}
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
                                    initialValue={props.data.password}
                                    initialValid={true}
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
                                    initialValue={props.data.passwordConfirmation}
                                    initialValid={true}
                                />
                                <Input
                                    element='input'
                                    type='number'
                                    id='age'
                                    label='Age'
                                    name='age'
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText='Please enter your age...'
                                    placeholder={props.data.age}
                                    onInput={inputHandler}
                                    initialValue={props.data.age}
                                    initialValid={true}
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
                                    placeholder={props.data.gender}
                                    options={genderType}
                                    onInput={inputHandler}
                                    initialValue={props.data.gender}
                                    initialValid={true}
                                />
                                <div className='btns-container'>
                                    <Button onClick={handleSubmit} variant='success' className='btn-button'>Update Profile</Button>
                                </div>
                        </Col>
                    </Row>
              </Form>
            
        </Container>
    )
}
export default UserEdit