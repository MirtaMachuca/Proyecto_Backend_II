/*import { Schema, model } from "mongoose";

const productCollection = "products";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: String,
  thumbnails: [String], 
});

export const productModel = model(productCollection, productSchema);*/
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: String,
  price: Number,
  stock: {
    type: Number,
    default: 0
  }
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
