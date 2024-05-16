// // // const dotenv = require('dotenv');
// // // dotenv.config();

// // var mysql      = require('mysql');
// // var database = mysql.createConnection({
// //     host: 'localhost',
// //     user: process.env.username,
// //     password: process.env.password,
// //     database: process.env.database
// // });
// // // 4.
// // database.connect((err => {
// //     if (err) throw err;
// //     console.log('MySQL Connected');
// // }));

// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'testsql',
//   database: 'myIRC'
// })

// if (connection.connect()){
//     console.log("ok")
// }else{
//     console.log("non")
// }

// // connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
// //   if (err) throw err

// //   console.log('The solution is: ', rows[0].solution)
// // })

// connection.end()

// module.exports = database;




// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'dbuser',
//   password : 's3kreee7'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();