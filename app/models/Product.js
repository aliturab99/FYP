import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
