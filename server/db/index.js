const {db} = require('./database.js')
const {User} = require("./models/User")
const {syncAndSeed} = require("./seed")
// // make models associations here!

//added this to seed and then in in here require it from 

module.exports = {
    db
    //other models
}