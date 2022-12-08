const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

const conn = process.env.DB_STRING || 'mongodb://127.0.0.1:27017/link-saver';

//
// main().catch(err => console.log(err));
//
// async function main() {
//     await mongoose.connect(conn, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
//
//     // use `await mongoose.co
//     // nnect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
//
//     // Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
//     const UserSchema = new mongoose.Schema({
//         username: String,
//         hash: String,
//         salt: String,
//         admin: Boolean
//     });
//
//
//     const User = mongoose.model('User', UserSchema);
//
//     const meUser = new User({
//         username: 'abcd',
//         hash: '0129ojoijsfioj',
//         salt: '3923109j',
//         admin: true
//
//     })
//
//     // await meUser.save()
//
//     const usersInDb = await User.find()
//
//     User.findOne({
//         username: 't3nna'
//     }, function (error, result) {
//         console.log(result)
//     })
//
// }


const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});


const User = mongoose.model('User', UserSchema);

// Expose the connection
module.exports = connection;


