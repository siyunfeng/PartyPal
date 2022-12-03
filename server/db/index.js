const { db } = require('./database.js');
const { User } = require('./models/User');
const { Favorite } = require('./models/Favorite');
const { Event } = require('./models/Event');

User.hasMany(Event);
Event.belongsTo(User);

User.hasMany(Favorite);
Favorite.belongsTo(User);
// QUESTION: should we add Favorite.hasMany(User)?

module.exports = {
  db,
  User,
  Favorite,
  Event,
};
