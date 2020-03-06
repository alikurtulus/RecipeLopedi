import React from 'react'
import {NavLink}  from 'react-router-dom'
import './Navbar.css'
import {Container,Navbar, Nav} from 'react-bootstrap'

const navbar = props =>{

   return (

       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav-bar-cs">
         <Navbar.Brand href="#home">
         <img
           alt=""
           src="https://www.freelogodesign.org/file/app/client/thumb/94e9144f-71f0-47e1-ae16-e3e42ab2b014_200x200.png?1582809728672"
           width="35"
           height="35"
           className="d-inline-block align-top"
         />{' '}
         RecipeLopedi
       </Navbar.Brand>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink}  to='/' >
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to='/recipes'> 
              Recipes
            </Nav.Link>
            <Nav.Link as={NavLink} to='/mealplans'>
              MealPlans
              </Nav.Link>
          </Nav>
         <Nav className="justify-content-end">
            <Nav.Link as={NavLink} to='/login' >
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to='/singUp'>
             SingUp
            </Nav.Link>
         </Nav>
       </Navbar.Collapse>
     </Navbar>




   )
}
export default navbar
