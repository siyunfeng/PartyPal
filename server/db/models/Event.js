const { db } = require('../database');
const { DataTypes } = require('sequelize');

const Event = db.define('event', {
  name: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.STRING,
  },
  venue: {
    type: DataTypes.STRING,
  },
  venueYelpId: {
    type: DataTypes.TEXT,
  },
  catering: {
    type: DataTypes.STRING,
  },
  cateringYelpId: {
    type: DataTypes.TEXT,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

module.exports = { Event };
