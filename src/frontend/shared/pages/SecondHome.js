import React,{useState, useEffect} from 'react'
import {Form,Row,Col,Container,CardDeck} from 'react-bootstrap'
import CardCuisine from '../components/UIElements/CardCuisine'
import axios from 'axios'
import cuisines from '../lib/cuisines'
import './SecondHome.css'
import { Link } from 'react-router-dom'

const SecondHome = props => {

  return (
    <div className='cuisines-page'>
      <Container className='card-box'>
      <Row>
         <CardDeck>
           {cuisines.map(cus=>
            <Col sm={3} key={cus.id} >
              <Link to={`cuisine/${cus.id}`}>  <CardCuisine  title={cus.cuisine} image={cus.mainImage} /></Link>  
            </Col>
           )}
         </CardDeck>
      </Row>
    </Container>

    </div>
    
  )
}
export default SecondHome
