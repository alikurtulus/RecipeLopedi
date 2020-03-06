import React from 'react'
import {Form,Container} from 'react-bootstrap'
import './Home.css'
import Hero from './Hero'
import SecondHome from './SecondHome'
const Home = props => {
  return(
    <React.Fragment>
       <Hero />
       <SecondHome />
    </React.Fragment>
  )
}
export default Home
