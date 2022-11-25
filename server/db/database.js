// const Sequelize = require('sequelize')

// // change database name to a more specific one later
// const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/boilerplate`, {
//   logging: false,
// })

// module.exports = {db}

const { Sequelize } = require("sequelize");
const dbUrl =
  process.env.DATABASE_URL || `postgres://localhost:5432/boilerplate`;

let config;
if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
} else {
  config = {
    logging: false,
  };
}
const db = new Sequelize(dbUrl, config);

module.exports = { db };
