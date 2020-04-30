const fs = require('fs')
const path = require('path')
const express = require('express')                                               // We import express module in our project.
const app = express()                                                            // We assign express's functions to app variable.
const bodyParser = require('body-parser')                                        // BodyParser catches data from the http request(POST,PATCH,PUT) and parsing this data to JSON object.
const HttpError =require('./models/HttpError')
const mongoose = require('mongoose')
const userRouter = require('./routes/user-routes')
const recipeRouter = require('./routes/recipe-routes')
const mealPlanRouter = require('./routes/mealplan-routes')

app.use(bodyParser.json())    
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);       
                                                                                // We catch data from request and turn this data to json object with BodyParser.
app.use('/uploads/images', express.static(path.join('uploads','images')))       // We create middleware for uploading images and we called this middleware here.
app.use((req, res, next) => {                                                   // We need to write this middleware. Because We decide to  how to get a request from the client.This is like protocol between server and client for the communication.
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers',
                'Origin, X-Request-With, Content-Type, Accept, Authorization'
)
 res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
  next()
})

app.use('/api/users',userRouter)
app.use('/api/recipes',recipeRouter)
app.use('/api/mealplans',mealPlanRouter)

app.use((req, res, next) => {                                                   // When the client try to access wrong routes. We need to say the client is going wrong way.
  const error = new HttpError('Could not find this route', 404)
  throw error
})
app.use((err,req,res,next) => {                                                 // We check if user pick file for importing an image.
  if(req.file){
    fs.unlink(req.file.path, err => {
      console.log(err)
    })
  }
  if(res.headerSent){
    return next(err)
  }
  res.status(err.code || 500)
  res.json({message:err.message || 'Unknown error occured'})
})

 // We connect our project with database. Mongoose communicate with database and we communicate with mongoose. This way is more secure.
mongoose
        .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-vvtq0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
          app.listen( process.env.PORT || 5000, () => {
            console.log('The Server is running')
          })
        })
        .catch(err => {
          console.log(err)
        })
