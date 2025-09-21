import { Schema , model} from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Salt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // will add createdAt and updatedAt fields automatically
);


const User = model("user", userSchema)

export default User;
