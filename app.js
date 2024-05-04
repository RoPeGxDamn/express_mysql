require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const cors = require('cors')
const router = require('./routes');

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());
app.use(cors())
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();