require('dotenv').config();
const XLSX = require("xlsx");
const express = require("express");
const fileUpload = require("express-fileupload"); // Middleware for handling file uploads
const app = express();
const bodyParser = require("body-parser")
const fs = require("fs");
const port = 8888;
const transactionController = require("./controllers/transactionController")

const userRouter = require("./route/user")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Enable CORS (Cross-Origin Resource Sharing) to allow requests from your frontend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Get all the transaction
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await transactionController.getAllTransactions()
    transactions.map((element) => {
      // Mask the bank data
      element.bankAccount = "*" + element.bankAccount.slice(-4)
      return element
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Use the fileUpload middleware to handle file uploads
app.use(fileUpload());

// Set up a route to handle file uploads
app.post("/upload", require("./services/convertTransactions"));

app.use("/user", userRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
