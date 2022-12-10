const mongoose = require('mongoose');

const  userData = (req, res, next) => {
    const conn = process.env.DB_STRING || 'mongodb://127.0.0.1:27017/link-saver';


    main().catch(err => console.log(err));

    async function main() {
        await mongoose.connect(conn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // use `await mongoose.co
        // nnect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled

        // Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
        const UserSchema = new mongoose.Schema({
            user: String,
            data: String
        });


        const User = mongoose.model('data', UserSchema);

        // const meUser = new User({
        //     user: 'abcd',
        //     data: '0129ojoijsfioj'
        //
        // })
        //
        // await meUser.save()
        //
        // const usersInDb = await User.find()
        // console.log(usersInDb)
        // console.log(req.session.passport.user)
        const data =  User.findOne({
            user: req.session.passport.user
        }, function (error, result) {
            if (error) throw error;
            if (result) {
                res.json(result)
            } else {
                res.send(JSON.stringify({
                    error : 'Error'
                }))
            }
        })


    }
}

module.exports = {userData};