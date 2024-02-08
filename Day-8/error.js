const express = require('express')
const app = express()

function positiveIntegerHandling(req,res){
    const num = Number(req.query.num)
    if(Number.isInteger(num) && num>0)res.send(`${num} is positive integer`)
    else throw new Error("number should be positive")
}

function errorHandller(err,req,res,next){
    if(err.message === "number should be positive"){
        res.status(400).send(`error:Number must be positive`)
    }else next(err)
}

app.get('/positive',positiveIntegerHandling)
app.use(errorHandller)

app.listen(3000)