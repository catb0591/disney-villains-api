const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('villainsDB', 'user', 'password', {
  host: 'localhost', dialect: 'mysql'
})

const villains = villainsModel(connection, Sequelize)

module.exports = { villains }
