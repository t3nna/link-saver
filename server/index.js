const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const mongoose = require("mongoose");
const passport = require("passport");


const {ping} = require("./controlers/ping");
const {errorHandler} = require("./middlewares/errorHandler");
const {login} = require("./controlers/login");

const app = express()

app.use(express.json())



// const connection = mongoose.connect(conn, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })



const conn = process.env.DB_STRING || 'mongodb://127.0.0.1:27017/link-saver';

app.use(session({
    secret: process.env.SECRET || 'some secret  string',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: conn,
        dbName: 'link-saver',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 1000*60*60*24,


    }),
    cookie: {
        maxAge: 1000*60*60*24,
    }
}))


//Passport auth

require('./db/passport')


app.use(passport.initialize())
app.use(passport.session())


app.get('/ping', ping)
app.get('/login', login)
app.get('/protected', (req, res, next) =>{

})

app.use(errorHandler)

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})