import React from 'react'
import {Form,Container} from 'react-bootstrap'
import './Home.css'
import Hero from './Hero'
import SecondHome from './SecondHome'
import MiddleHome from './MiddleHome'
import Footer from './Footer'
const Home = props => {
  return(
    <React.Fragment>
       <Hero />
        <div className='borders'></div>
        <MiddleHome />
        <SecondHome />
        <Footer/>
    </React.Fragment>
  )
}
export default Home
