const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))

function staticFileServeer(req,res){
    const filePath = req.url === '/' ? 'index.html' : req.url.slice(1)
    res.sendFile(path.join(__dirname,'public',filePath),(err)=>{
        if(err) res.status(404).send('File not found')
    })
}

app.get('/',staticFileServeer)

app.listen(3000)