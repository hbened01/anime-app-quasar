const mysql = require("mysql");

const conection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

conection.connect((e) => {
  if (e) {
    console.log("the error of connection is because:", e);
    return;
  }
  console.log("conection sussesfully");
});

module.exports = conection;
