// 26. Problem: Aggregation Pipeline for Product Stats

// Problem Statement: Create an aggregation pipeline to calculate statistics for products in MongoDB. Implement a function to execute the pipeline and return aggregated results like the total number of products, the average price, and the highest quantity.

// Function Signature:

// /**
//  * Executes an aggregation pipeline to calculate product statistics
//  * @returns {Object} - Aggregated product statistics
//  */
// function getProductStatistics() {
//   // Your implementation here
// }
// Expected Output:

// The function should return an object with aggregated product statistics.

// Test Cases:
// 1. Call the function and check the results for the expected product statistics.

// Hint: To calculate statistics for products in MongoDB using an aggregation pipeline, you can use the $group stage to calculate the total number of products (totalProducts), the average price (averagePrice), and the highest quantity (highestQuantity). Use $sum, $avg, and $max operators respectively for these calculations.

// solution:-

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

mongoose.connect("mongodb://127.0.0.1:27017/nodejs-scaler");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());

async function getProductStatistics() {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" },
        },
      },
    ];

    return (await Product.aggregate(pipeline))[0];
  } catch (error) {
    console.error("Error calculating product statistics:", error.message);
    throw error;
  }
}

app.get("/products", async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/product-statistics", async (req, res) => {
  try {
    res.json(await getProductStatistics());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));