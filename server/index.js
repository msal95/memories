import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Local Imports
import postRoutes from "./routers/posts.js";
import userRoutes from "./routers/users.js";
import "./db/conn.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
