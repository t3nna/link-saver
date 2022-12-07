async function errorHandler (error, req, res, next){
    console.log(error)

    res.status(error.status || 500).send({
        status: "error",
        message: error.message
    })
}

module.exports = {errorHandler}