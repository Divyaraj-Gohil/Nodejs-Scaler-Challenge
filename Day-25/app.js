/* Importing mongoose */
const mongoose = require("mongoose");

/* Defining ProductSchema */
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/* Exporting ProductSchema */
const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;

/* Connecting to mongodb  */
const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/nodejs-scaler")
    .then((e) => console.log("Succesfully connected to mongoDB."))
    .catch(console.error);
};

connectDB();

/* Function to Creates an index on the "name" field of the "Product" collection in MongoDB */
const createProductNameIndex = async () => {
  try {
    await Product.init();
    await Product.createIndexes({ name: 1 });
    console.log("Index created succesfully.");
  } catch (error) {
    console.log(error);
  }
};

createProductNameIndex();