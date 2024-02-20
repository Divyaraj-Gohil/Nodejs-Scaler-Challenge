const express = require('express');
const mongoose = require('mongoose');

const app = express();

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const User = mongoose.model('User', userSchema, 'users');

function addUserToDatabase(user) {
    const newUser = new User(user);
    newUser.save().then(() => {
        console.log("User saved successfully;");
    }).catch((err) => {
        console.log(err.message);
    })
}
mongoose.connect('mongodb://127.0.0.1:27017/nodejs-scaler', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Express server is listening on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Express route to calculate the average age of all users in MongoDB
app.get('/average-age', averageAgeOfUsers);

// Route handler function to calculate the average age
function averageAgeOfUsers(req, res) {
    // Use MongoDB aggregation to calculate the average age
    User.aggregate([
        {
            $group: {
                _id: null,
                averageAge: { $avg: '$age' },
            },
        },
    ])
    .then((result) => {
        // Extract the average age from the aggregation result
        const averageAge = result[0].averageAge;
        // Send a JSON response with the calculated average age
        res.json({ averageAge });
    })
    .catch((error) => {
        // Handle errors during the aggregation
        console.error('Error calculating average age:', error);
        // Send an appropriate error response
        res.status(500).json({ error: 'Internal Server Error' });
    });
}