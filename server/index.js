const express = require("express")
const {ping} = require("./controlers/ping");
const {errorHandler} = require("./middlewares/errorHandler");
const {login} = require("./controlers/login");

const app = express()

app.use(express.json())

app.get('/ping', ping)
app.get('/login', login)
app.get('/protected', (req, res, next) =>{

})

app.use(errorHandler)

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})