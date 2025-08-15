import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  age: Number,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "PREMIUM"],
    default: "USER",
  },
  
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;