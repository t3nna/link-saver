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
app.use(express.urlencoded({extended: true}));



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
const {genPassword} = require("./utils/password");
const {isAdmin, isAuth} = require("./middlewares/auth");


app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    next()
})

const User = mongoose.model('User')



app.get('/ping', ping)
app.post('/login',(req, res, next) => {
    console.log(req.body)
    next();
}, passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' })
    );

app.post('/register', (req, res, next) => {
    console.log(req.body)
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
        admin: true
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
});


/**
 * -------------- GET ROUTES ----------------
 */

app.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
app.get('/login', (req, res, next) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
app.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="POST" action="/register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */
app.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

app.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
app.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

app.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

app.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

app.use(errorHandler)

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})