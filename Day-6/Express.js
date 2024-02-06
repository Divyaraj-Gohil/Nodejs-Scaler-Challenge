const express = require('express')
const app = express()

function greetHandler(req, res) {
    const Name = req.query.name
    if (Name) res.send(`Hello, ${Name}!`)
    else res.send("Hello, Guest!")
}
app.get('/', (req, res) => {
    res.send("Server is on!")
})

app.get('/greet', greetHandler)

app.listen(3000)