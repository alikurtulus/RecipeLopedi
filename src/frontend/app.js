import React,   {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Navbar from './shared/components/Navigation/Navbar'
import {AuthContext} from './shared/context/auth-context'
import {Spinner} from 'react-bootstrap'
import {useAuth} from './shared/hooks/auth-hook'
import {Provider} from 'react-redux'
import store from './store'

const RecipeComplexDetails = React.lazy(() => import('./recipes/components/RecipeComplexDetails'))
const RecipeSearches = React.lazy(() => import ('./recipes/components/RecipeSearches'))
const Home = React.lazy(() => import('./shared/pages/Home'))
const Auth = React.lazy(() => import('./users/components/Auth'))
const CuisineRecipes = React.lazy(() => import('./shared/pages/CuisineRecipes'))
const RecipeDetails = React.lazy(() => import('./recipes/components/RecipeDetails'))
const Profile = React.lazy(() => import('./users/components/Profile'))
const NewRecipe = React.lazy(() => import('./recipes/components/NewRecipe'))
const UsersRecipes = React.lazy(()=> import('./recipes/components/UsersRecipes'))
const UserRecipesDetails = React.lazy(() => import('./recipes/components/UserRecipesDetails'))
const NewMealPlan = React.lazy(() => import ('./mealplans/NewMealPlan'))



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
            <Route  path = '/recipes/usersRecipes/details/:rid'>
              <UserRecipesDetails />
            </Route>
            <Route exact path="/recipes/all">
                  <UsersRecipes />
            </Route>
            <Route path='/recipes/searches' >
                  <RecipeSearches />
            </Route>
            <Route path='/recipes/new' >
                  <NewRecipe />
            </Route>
            <Route path='/recipe/details/:id' >
                 <RecipeComplexDetails   />
            </Route>
            <Route path='/mealplans/new'>
               <NewMealPlan />
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
                <Route  path = '/recipes/usersRecipes/details/:rid'>
                    <UserRecipesDetails />
                  </Route>
                <Router exact path="/recipes/all">
                  <UsersRecipes />
                </Router>
                <Route path='/cuisine/:id' exact>
                  <CuisineRecipes />
                </Route>
                <Route path='/mealplans/new'>
                  <NewMealPlan />
                </Route> 
                <Route path='/recipes/searches' >
                  <RecipeSearches />
                </Route>  
                <Route path='/recipe/details/:id' >
                 <RecipeComplexDetails   />
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
