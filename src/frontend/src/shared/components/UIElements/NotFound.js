import React from 'react'
import {Image,Container} from 'react-bootstrap'
import notFoundIcon from '../../../assets/404.png'
import './NotFound.css'
const  NotFound = ()=> {
    return (
        <Container className='notfound-container'>
            <Image src={notFoundIcon} className='not-found-img' />
            <p>This page not found ...</p>
        </Container>
    )
}
export default NotFound