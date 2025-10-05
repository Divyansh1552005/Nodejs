import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    registered: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    eyeColor: {
      type: String,
      required: true,
    },
    favoriteFruit: {
      type: String,
      required: true,
    },
    company: {
      title: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      location: {
        country: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
  },
  {
    collection: "Users", // your existing collection name
    timestamps: false,   // since registered field already exists
  }
);

const User = mongoose.model("User", userSchema);
export default User;
