const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proyecto_back",
});

connection.connect((error) => {
  if (error) {
    return console.log(error);
  }

  console.log("Conectado");
});

module.exports = connection;
