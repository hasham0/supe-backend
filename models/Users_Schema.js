import mongoose from "mongoose";
const { Schema } = mongoose;

// schema structure
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      minLength: [3, "please provide atleast 3 characters"],
      maxLength: [20],
      require: [true, "please provide the first name"],
    },
    last_name: {
      type: String,
      minLength: [3, "please provide atleast 3 characters"],
      maxLength: [20],
      require: [true, "please provide the lastname name "],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      minLength: [5, "please provide atleast 5 characters"],
      maxLength: [500],
      require: [true, "please provide the password name "],
    },
  },
  {
    timestamps: tue,
  }
);

// pass schema in model
export const Users_col =
  mongoose.model["userSchema"] || mongoose.model(`user`, userSchema);
