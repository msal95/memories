import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);

    if (!isPassword) {
      return res.status(404).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  console.log(
    "🚀 ~ file: users.js/Controller ~ line 36 ~ signup ~ req.body",
    req.body
  );

  try {
    const existingUser = await User.findOne({ email });

    // console.log(
    //   "🚀 ~ file: users.js/Controller ~ line 44 ~ signup ~ existingUser",
    //   existingUser
    // );

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // console.log(
    //   "🚀 ~ file: users.js/Controller ~ line 56 ~ signup ~ hashedPassword",
    //   hashedPassword
    // );

    const registerUser = new User({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // console.log(
    //   "🚀 ~ file: users.js/Controller ~ line 56 ~ signup ~ registerUser",
    //   registerUser
    // );

    const result = await registerUser.save();

    // console.log("🚀 ~ file: users.js ~ line 77 ~ signup ~ result", result);

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "muhammadshahid",
      { expiresIn: "1h" }
    );

    // console.log("🚀 ~ file: users.js ~ line 81 ~ signup ~ token", token);

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
