const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Initialize User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
})

// Initialize User Model
const User = mongoose.model('User', userSchema);

/**
 * Adds a new user to the MongoDB database
 * @param {Object} user - User object with properties username and email
 */
async function addUserToDatabase(user) {
    // Your implementation here
    try {
        const newUser = new User(user);
        await newUser.save();
        console.log("User Added to Database");
    } catch (error) {
        console.log(error);
    }
}

/**
 * Establishes a connection to MongoDB using Mongoose
 */
async function connectToMongoDB() {
    // Your implementation here
    try {
        mongoose.connection
            .on('error', (error) => {
                console.log("Error: " + error);
            })
            .once('open', (error) => {
                if (error) {
                    console.log(error);
                }
                console.log("Connection is established and OPEN!");

                // Since connection is established and OPEN, we can add new user details to database
                const user = {
                    name: "Subham",
                    email: "test.subham@gmail.com",
                }

                addUserToDatabase(user);
            })
            .on('connecting', () => {
                console.log("Mongo DB Connecting! Please Wait...");
            })
            .on('connected', () => {
                console.log("Mongo DB Connected!");
            })
            .on('disconnected', () => {
                console.log("Mongo DB Disconnected!");
            })

        await mongoose.connect('mongodb://127.0.0.1:27017/scalerDatabase');
    } catch (error) {
        console.log(error);
    }
}

const port = 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Listening at http://127.0.0.1:${port}`);
        connectToMongoDB();
    }
})