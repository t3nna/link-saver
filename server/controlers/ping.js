const ping =(req, res, next )=>{
    return res.send("<h1>Pong!!!</h1>")
}

module.exports = {ping}