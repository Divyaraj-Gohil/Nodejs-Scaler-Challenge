const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
require('dotenv').config()

function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        } else {
            req.user = decoded;
            next();
        }
    });
}
app.get("/", (req, res) => {
    res.send("Hello Scaler")
})

app.get("/protected", authenticationMiddleware, (req, res) => {
    res.send("Protected route accessed successfully")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Listening to port http://localhost:%d", PORT)
})

const secretKey = 'Scaler';
const token = jwt.sign({}, secretKey, { expiresIn: '1h' });

console.log('Generated token:', token);
