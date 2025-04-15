// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',           // Adjust if needed
  user: 'your_db_username',    // Replace with your MySQL username
  password: 'your_db_password',// Replace with your MySQL password
  database: 'technoapp'        // Must match your DB name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;
