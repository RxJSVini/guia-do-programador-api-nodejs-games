const Sequelize = require('sequelize');
const connection = new Sequelize('api_games', 'root', '12345', {
  dialect: 'mysql',
  host: '127.0.0.1'
})

module.exports = connection;