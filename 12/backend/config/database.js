import mysql from "mysql2";
  
// create the connection to database
const db = mysql.createConnection({
  host: '85.192.41.149',
  user: 'test_usr',
  password: 'coeoas5j8O6xXtvJ',
  database: 'test'
});

export default db;