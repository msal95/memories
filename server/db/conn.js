import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import mongoose from "mongoose";

const DB_CONNECTION_URL = process.env.DB_URL;

console.log(
  "🚀 ~ file: conn.js ~ line 8 ~ DB_CONNECTION_URL",
  DB_CONNECTION_URL
);

mongoose
  .connect(DB_CONNECTION_URL, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected Successfully"))
  .catch((error) => console.log(error.message));
