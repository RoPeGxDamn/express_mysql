const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_DBNAME,
  username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  dialect: "mysql",
});
