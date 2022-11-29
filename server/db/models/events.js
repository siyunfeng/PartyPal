const { db } = require("../database");
const { DataTypes } = require("sequelize");

const Event = db.define("event", {
  name: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  time: {
    type: DataTypes.STRING
  },
  venue: {
    type: DataTypes.INTEGER
  },
  catering: {
    type: DataTypes.INTEGER
  },
  notes: {
    type: DataTypes.TEXT
  }
});

module.exports = Event