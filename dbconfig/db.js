const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dbnodejs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: console.log
});


module.exports = sequelize;
