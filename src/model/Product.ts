import mongoose from "mongoose";

// create IProduct interface
interface IProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  tags: string[];
  owner: mongoose.Schema.Types.ObjectId;
}

// create productSchema
const productSchema = new mongoose.Schema<IProduct>(
  {
    // name, description, price, image, tags, createdAt, updatedAt
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, " Name must be at least 3 characters long"],
      maxLength: [100, "Name must be at most 100 characters long"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: [10, "Description must be at least 10 characters long"],
      maxLength: [1000, "Description must be at most 1000 characters long"],
    },
    price: { type: Number, default: 0, required: true },
    quantity: { type: Number, default: 1 },
    image: {
      type: String,
      required: true,
      trim: true,
      match: /^https?:\/\/.*\.(png|jpg|jpeg)$/,
    },
    tags: {
      type: [String],
      default: [],
      enum: ["work", "lifestyle", "motor", "mobile"],
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// create Product model
const Product = mongoose.model<IProduct>("Product", productSchema);

// export Product model
export default Product;
