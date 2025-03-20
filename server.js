const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./db'); 
const todo = require('../routes/PersonRoutes')
const app = express();
app.use(bodyParser.json())

// Connect to MongoDB
connectDB();

app.use('/todo', todo)
app.listen(3000)