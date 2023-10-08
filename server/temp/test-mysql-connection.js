const mysql = require('mysql2');

// Create a connection to your MySQL database
const connection = mysql.createConnection({
  host: 'localhost',          // Replace with your MySQL host
  user: 'namnguyen',       // Replace with your MySQL username
  password: 'namnguyen',   // Replace with your MySQL password
  database: 'cashmanagementdb', // Replace with your database name
});

// Attempt to connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL database');
});

// Close the connection when done
connection.end();
