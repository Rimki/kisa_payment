var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'k1085317',
  database : 'kisapay'
});
 
connection.connect();
 
connection.query('SELECT * from kisapay.user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();