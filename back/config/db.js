import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port :  process.env.PORTDB
});

pool.getConnection(function(error, connection) {
  if (error) {
    console.log("Error connecting to database:", error);
  } else {
    console.log("Connected to database!");

    // Exemple de requête pour tester la connexion
    connection.query("SELECT 1", function(err, results) {
      if (err) {
        console.log("Error executing query:", err);
      } else {
        console.log("Query executed successfully:", results);
      }

      connection.release(); // Libérer la connexion après utilisation
    });
  }
});

export default pool 