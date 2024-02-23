const express = require("express");
const app = express();
const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
});
const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);

// const Product = mongoose.model('Product', productSchema);
function connectToMongoDB() {
    mongoose.connect("mongodb://127.0.0.1:27017/nodejs-scaler");
    const db = mongoose.connection;
    db.on("error", (error) => {
        console.log(`Error connecting to DB ${error}`);
    }).once("open", () => {
        console.log(`Connected to DB`);
    })
}

connectToMongoDB();

  const getProductsPopulatedWithCategory = async () => {
    try {
      const products = await ProductWithCategory.find().populate('category');
      return products;
    } catch (error) {
      throw error;
    }
  };
  getProductsPopulatedWithCategory();
  

app.get("/", (req, res) => {
    res.send("Hello world!")
})
app.listen(3000, () => {
    console.log("server started at port: ", 3000);
})