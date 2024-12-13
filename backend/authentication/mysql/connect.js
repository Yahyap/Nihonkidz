const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.DB_HOSTNAME || "localhost",
  database: process.env.DB_NAME || "website_edukasi_jepang",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
});

connection.getConnection(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("MySQL Database is connected Successfully");
  }
});

module.exports = connection;
