const express = require('express')                                 // We import express module in our project.
const app = express()                                              // We assign express's funtions to app variable.
const bodyParser = require('body-parser')                          // Bodyparser catches data from the http request(POST,PATCH,PUT) and parsing this data to JSON object.
const HttpError =require('./models/HttpError')
const mongoose = require('mongoose')

app.use((req, res, next) => {                                      // We need to write this middleware. Because We decide to  how to get a request from the client.This is like protocol between server and client for the communication.
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers',
                'Origin, X-Request-With, Content-Type, Accept, Authorization'
)
 res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
  next()
})

app.use((req, res, next) => {                                   // When the client try to access wrong routes. We need to say the client is going wrong way.
  const error = new HttpError('Could not find this route', 404)
  throw error
})
 // We connect our project with database. Mogoose communicate with database and we communicate with mongoose. This way is more secure.
mongoose
        .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-vvtq0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
          app.listen(3000, () => {                                          // We run server and listen on 3000 port.
            console.log('The Server is running')
          })
        })
        .catch(err => {
          console.log(err)
        })
