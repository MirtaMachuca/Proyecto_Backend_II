import { Schema, model } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({
  user: { type: String, required: true }, 
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products", 
      },
      quantity: { type: Number, default: 1 },
    }
  ],
});

export const cartModel = model(cartCollection, cartSchema);
