require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users-route');
const notesRoute = require('./routes/notes-route');
const HttpError = require('./models/http-errors');

const app = express();

app.use(bodyParser.json());

//Set headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });

//Routes
app.use('/api/users', usersRoutes);
app.use('/api/noteKeeper', notesRoute);


// Error handling
app.use((req, res, next)=>{
    const error = new HttpError('Could not find route', 404);
    throw error;
});

app.use((err, req, res, next) => {
    if(res.headerSent){
        return next(err);
    }
    res.status(err.code || 500);
    res.json({message: err.message ||"An unknown error occurred"});
})

//DB/Server Connection
mongoose.set("strictQuery", false);
mongoose
.connect(process.env.DB_CONNECTION)
.then(()=>{
    app.listen(5000);
    console.log("Successfully Connected")
})
.catch(err => {
    console.log(err);
});
