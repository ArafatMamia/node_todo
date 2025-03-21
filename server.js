const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./db'); 
const todo = require('./routes/TodoRoutes')
require('dotenv').config()
const app = express();
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000
// Connect to MongoDB
connectDB();

app.use('/todo', todo)
app.listen(PORT)