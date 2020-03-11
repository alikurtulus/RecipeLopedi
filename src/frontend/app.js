import React,   {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Navbar from './shared/components/Navigation/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';


import {AuthContext} from './shared/context/auth-context'
import {Spinner} from 'react-bootstrap'
import {useAuth} from './shared/hooks/auth-hook'
import {Provider} from 'react-redux'
import store from './store'


const Home = React.lazy(() => import('./shared/pages/Home'))
const Auth = React.lazy(() => import('./users/components/Auth'))
const CuisineRecipes = React.lazy(() => import('./shared/pages/CuisineRecipes'))
const RecipeDetails = React.lazy(() => import('./recipes/components/RecipeDetails'))
const Profile = React.lazy(() => import('./users/components/Profile'))



const  App = () => {
  const {token, login, logout, userId} = useAuth()

  
    let routes 
    if(token){
      routes = (

        <Switch>
           <Route path='/' exact>
             <Home />
           </Route>
           <Route path='/profile'  exact>
                  <Profile />
                </Route>
           <Route path='/cuisine/recipe/:id'  >
            <RecipeDetails />
            </Route> 
            <Route path='/cuisine/:id' exact>
             <CuisineRecipes />
            </Route>  
           <Redirect to='/' />

        </Switch>

      )
    }
    else{
      routes = 
          (  
            <Switch>
                <Route path='/auth'  exact>
                  <Auth />
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
                <Redirect to='/auth' />
            
            </Switch>      
          )
        
    }
    
    return(
      <React.Fragment>
         
        <Provider store={store}>
        <AuthContext.Provider
              value={
              {isLoggedIn:!!token,
              token:token,
              userId:userId,
              login:login,
              logout:logout}
            }>
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
        </AuthContext.Provider>
        </Provider>
        

      </React.Fragment>

    )

}
ReactDOM.render(
  <App />,document.getElementById('root')
)
