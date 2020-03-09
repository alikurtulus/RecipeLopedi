import React,   {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Navbar from './shared/components/Navigation/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './shared/pages/Home'
import SingUp from './users/components/SignUp'
import Login from './users/components/Login'
import {Spinner} from 'react-bootstrap'
import login from './users/components/Login';
import singUp from './users/components/SignUp';
import {Provider} from 'react-redux'
import store from './store'
import CuisineRecipes from './shared/pages/CuisineRecipes'
import RecipeDetails from './recipes/components/RecipeDetails'



class App extends React.Component{
  constructor(props){
    super(props)

  }
  render(){
    let routes 
     routes = 
    (  
      <Switch>
          <Route path='/singUp'  exact>
             <SingUp />
          </Route>
          <Route path='/login'  exact >
            <Login />
          </Route> 
         
          <Route path='/cuisine/recipe/:id'  >
            <RecipeDetails />
          </Route> 
          <Route path='/cuisine/:id' exact>
            <CuisineRecipes />
          </Route>  
                 
          <Route path='/' exact >
            <Home />
          </Route>
      
      </Switch>      
     )
        
    return(
      <React.Fragment>
        <Provider store={store}>
        <Router>
          <Navbar />
          <main>
            <Suspense fallback={
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            }>
            {routes}
            </Suspense>
          </main>
        </Router>
        </Provider>
        

      </React.Fragment>

    )
  }
}
ReactDOM.render(
  <App />,document.getElementById('root')
)
