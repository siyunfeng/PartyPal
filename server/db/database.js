const Sequelize = require('sequelize')

// change database name to a more specific one later
const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/boilerplate`, {
  logging: false,
})


module.exports = {db}
