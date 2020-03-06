import React,{useState} from 'react'
import {ProgressBar} from 'react-bootstrap'

const UploadBar = props => {
    const [uploadedFile,setUploaded] = useState({})
   return (
    <ProgressBar animated  now={60} />
   )
}
export default UploadBar