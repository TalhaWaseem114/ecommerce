import mongoose from "mongoose";

const favProductSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true},
    userEmail: { type: String, required: true},
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    noOfReview: { type: Number, default: 1 },
    color: { type: String, required: true },
    size: [{ type: String }]
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", favProductSchema);
export default Favorite;
