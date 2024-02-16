const express = require('express')
const mongoose = require('mongoose')

const app = express()

async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/scaler')
        console.log("Mongodb connection successful");
    } catch (error) {
        console.log(error);
    }
}
connectToMongoDB()

app.listen(3000, () => {
    console.log("Listening to port 3000")
})