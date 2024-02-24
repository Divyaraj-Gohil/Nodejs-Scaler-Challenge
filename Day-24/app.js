// 24. Problem: Express Route for Product CRUD Operations

// Problem Statement: Create Express routes for handling CRUD operations on products using MongoDB and Mongoose. Implement routes for creating, reading, updating, and deleting products.

// Function Signature:

// /**
//  * Express route to create a new product
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// function createProductRoute(req, res) {
//   // Your implementation here
// }

// /**
//  * Express route to retrieve all products
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// function getAllProductsRoute(req, res) {
//   // Your implementation here
// }

// /**
//  * Express route to update a product
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// function updateProductRoute(req, res) {
//   // Your implementation here
// }

// /**
//  * Express route to delete a product
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// function deleteProductRoute(req, res) {
//   // Your implementation here
// }


// Expected Output:
// The routes should perform the respective CRUD operations on the "Product" collection in MongoDB.

// Test Cases:
// Use tools like Postman to send HTTP requests to each route and check the MongoDB database for the expected changes.
// Hint: Schema Definition: Use the mongoose.Schema constructor to define a schema with fields like name, description, price, etc. Use appropriate data types and validation as needed.
// Model Creation: Use the mongoose.model method to create a model for the products collection based on the schema defined in step 1.
// Route Handlers: Implement route handlers that use the Mongoose model to perform CRUD operations on the products collection. For example, the handler for creating a product would create a new instance of the model with the request body and then save it to the database.
// MongoDB Connection: Use the mongoose.connect method to connect to your MongoDB database. You can specify the connection URI as a parameter to this method.
// Express Routes: Use the app.post, app.get, app.put, and app.delete methods of the Express app object to define routes for creating, reading, updating, and deleting products, respectively. Map these routes to the appropriate route handlers.
// Testing: Use Postman or a similar tool to send HTTP requests to your Express routes and verify that they perform the expected CRUD operations on the MongoDB database.

// solution:-

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/nodejs-scaler');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the Product schema
const productSchema = new mongoose.Schema({
//   id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  // Add other fields as needed
});

// Create a Mongoose model for the Product
const Product = mongoose.model('Product', productSchema);

// Express middleware to parse JSON in request body
app.use(bodyParser.json());

// Dummy data with id
const dummyProducts = [
  { name: 'Product 1', price: 10.99, quantity: 50 },
  { name: 'Product 2', price: 20.99, quantity: 30 },
  { name: 'Product 3', price: 15.99, quantity: 25 },
];

// Insert dummy data
async function insertDummyData() {
  try {
    const productsWithIds = dummyProducts.map(product => ({
      ...product,
      id: new mongoose.Types.ObjectId(),
    }));

    await Product.insertMany(productsWithIds);
    //console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error inserting dummy data:', error.message);
  }
}

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product (name, price, and quantity)
app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product based on ID
app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server and insert dummy data
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  insertDummyData();
});