import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getPostsBySearch,
  likeCountPost,
  updatePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.patch("/:id/likePost", auth, likeCountPost);

export default router;
