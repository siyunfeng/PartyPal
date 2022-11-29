const { db } = require('./database.js');
const { User } = require('./models/User');
const { Favorite } = require('./models/Favorite');
const Event = require('./models/events');
// // make models associations here!

//added this to seed and then in in here require it from

User.hasMany(Event);
Event.belongsTo(User);

User.hasMany(Favorite);
Favorite.belongsTo(User);

module.exports = {
  db,
  User,
  Favorite,
  Event,
};
