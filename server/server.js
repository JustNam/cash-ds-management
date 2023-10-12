const XLSX = require('xlsx');
const express = require('express');
const fileUpload = require('express-fileupload'); // Middleware for handling file uploads
const app = express();
const fs = require('fs');
const port = 8888;
const transactionController = require('./controllers/transactionController')
var cors = require('cors');
app.use(cors());
app.use(express.json())

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from your frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Use the fileUpload middleware to handle file uploads
app.use(fileUpload());

// Set up a route to handle file uploads
app.post('/upload', require('./services/convertTransactions'));

// login
app.post('/login', require('./services/login'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});