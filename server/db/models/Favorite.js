const { db } = require('../database');
const { DataTypes } = require('sequelize');

const Favorite = db.define('favorite', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('caterer', 'venue'),
    allowNull: false,
  },
  yelp_reference_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
    validate: {
      isUrl: true,
    },
    defaultValue:
      'https://images.pexels.com/photos/587739/pexels-photo-587739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
});

module.exports = {
  Favorite,
};
