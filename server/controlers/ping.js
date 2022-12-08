const ping =(req, res, next )=>{
    console.log(req.session)

    if(req.session.viewCount){
        req.session.viewCount+=1
    }
    else{
        req.session.viewCount=1
    }

    return res.send(`<h1>Pong\n you have visited this page${req.session.viewCount} times</h1>`)
}

module.exports = {ping}