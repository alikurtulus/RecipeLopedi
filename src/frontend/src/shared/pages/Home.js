import React from 'react'
import {Form,Container} from 'react-bootstrap'
import './Home.css'
import Hero from './Hero'
import CommentSide from './CommentSide'
import FirstVideoSide from './FirstVideoSide'
import SecondVideoSide from './SecondVideoSide'
import MiddleHome from './MiddleHome'
import Footer from './Footer'
import DietPage from './DietPage'
const Home = props => {
  return(
    <React.Fragment>
        <Hero />
        <div className='borders'></div>
        <MiddleHome />
        <div className='borders'></div>
        <DietPage/>
        <div className='borders'></div>
        <FirstVideoSide />
        <div className='borders'></div>
        <CommentSide />
        <div className='borders'></div>
        <SecondVideoSide />
        <div className='borders'></div>
        <Footer/>
    </React.Fragment>
  )
}
export default Home
