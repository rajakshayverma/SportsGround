import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String },
    stock: { type: Number, default: 0.0, required: true },
    price: { type: Number, default: 0.0, required: true },
    discountPrice: { type: Number, default: 0.0, required: true },
    rating: { type: Number, default: 0.0, required: true },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
export default Product;
