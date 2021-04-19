const { Sequelize, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const connection = require('../database/db');
const fs = require('fs');
const path = require('path');

const Users = connection.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }

})


// fs.readFile(path.resolve(__dirname, '.', 'config.json'), { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data)
// })


// Users.sync({ force: true }).then(() => { })

module.exports = Users;
