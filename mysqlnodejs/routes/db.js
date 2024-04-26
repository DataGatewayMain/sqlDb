var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'srv1391.hstgr.io',
  user: 'u858543158_arpita',
  password: 'Arpita@1234#',
  database: 'u858543158_arpitaDb'
});
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.error('Error connecting to database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      connection.query('SELECT * FROM arpitaTable', function(err, results, fields) {
        connection.release(); // release the connection
  
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
  
        console.log('Query results:', results); // log query results
  
        // Send the query results as JSON data
        res.json(results);
      });
    });
  });
  
  

module.exports = router;
