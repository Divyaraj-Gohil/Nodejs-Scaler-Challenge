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
    id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

// Create a Mongoose model for the Product
const Product = mongoose.model('Product', productSchema);

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
        console.log('Dummy data inserted successfully');
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

