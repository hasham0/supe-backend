import mongoose from "mongoose";
const { Schema } = mongoose;

// schema structure
const prodSchema = new Schema(
  {
    title: {
      type: String,
      minLength: [5, "please provide atleast 5 characters"],
      maxLength: [100],
      require: [true, "please provide the title "],
      unique: true,
    },
    price: {
      type: Number,
      min: [100, "alteast 100"],
      max: [1000, "not greter than 1000"],
      require: [true, "please provide the price"],
    },
    description: {
      type: String,
      require: [true, "please provide the description "],
    },
    category: {
      type: String,
      require: [true, "please provide "],
    },
    image: [
      {
        url: String,
      },
    ],
    rating: {
      rate: { type: Number, min: [1, "alteast 1"], max: [5, "maximum 5"] },
      count: { type: Number, min: [1], max: [10] },
    },
  },
  {
    timestamps: true,
  }
);

// pass schema in model
export const Product_col =
  mongoose.model["products"] || mongoose.model(`products`, prodSchema);
