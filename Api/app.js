const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./database/db');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));
app.use(routes);

db
  .authenticate()
  .then(() => {
    console.log('Banco de dados conectado com sucesso !')
  })
  .catch((err) => {
    console.log(err)
  })

module.exports = app;
