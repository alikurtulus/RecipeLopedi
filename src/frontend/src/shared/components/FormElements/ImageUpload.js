import React, {useRef, useState, useEffect} from 'react'
import {Form,InputGroup,Container,Row,Col,Figure, Button, FormControl, ProgressBar } from 'react-bootstrap'
import UploadBar from '../UIElements/UploadBar'
import './ImageUpload.css'


const ImageUpload = props =>{
  const filePickerRef = useRef()
  const [file, setFile] = useState()
  const [fileName, setFileName] = useState('Choose file...')
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)


   const pickImageHandler = () => {
     filePickerRef.current.click()
   }
   useEffect(()=>{
     if(!file){
       return
     }
     const fileReader = new FileReader()
     fileReader.onload = () => {
       setPreviewUrl(fileReader.result)
     }
     fileReader.readAsDataURL(file)

   },[file])
   const pickedHandler = event => {
       let pickedFile
       let fileIsValid = isValid
        if(event.target.files && event.target.files.length === 1){
             pickedFile = event.target.files[0]
             setFileName(event.target.files[0].name)
             setFile(pickedFile)
             setIsValid(true)
             fileIsValid=true

        }else{
              setIsValid(false)
              fileIsValid=false
        }
        props.onInput(props.id, pickedFile, fileIsValid)
   }
    return (

        <Form.Group controlid={props.cId} >
            <InputGroup className="mb-3 ">
              <Container>
              <Row>
                  <Col className='image-upload-container'>
                    <Figure className='image-upload__preview' >
                      {previewUrl && 
                        <Figure.Image
                      
                          alt="preview"
                          className='image-name'
                          src={previewUrl}
                        />
                      }
                        <Figure.Caption>
                        {!previewUrl && <p>Please pick an image</p>}
                        </Figure.Caption>
                    </Figure>
                  </Col>
                </Row>
                <Row>
                  <Col className='input-button'>
                      <FormControl
                        as='input'
                        type='text'
                        isValid={props.isValid} 
                        style={{display:'none'}}
                        ref={filePickerRef}
                        type="file"
                        aria-describedby="basic-addon2"
                        onChange={pickedHandler}
                        accept=".jpg,.png,.jpeg" 
                      />
                    <Form.Control  id='image-path' value={fileName} onChange={pickedHandler} />
            
                    <InputGroup.Append>
                      <Button variant="secondary" onClick={pickImageHandler}>Pick Image</Button> 
                    </InputGroup.Append>
                  </Col>
                </Row>
              </Container>   
            
            </InputGroup>
  
         
        </Form.Group>  

    )
}
export default ImageUpload
