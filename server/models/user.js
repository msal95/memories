import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  id: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = new mongoose.model("User", userSchema);

export default User;
