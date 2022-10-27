import mongoose from "mongoose";
import PostMessage from "../models/postMessages.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //Get Starting index of every page.
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      posts,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  // console.log("🚀 ~ file: posts.js/Controller ~ line 29 ~ getPost ~ id", id);

  try {
    const post = await PostMessage.findById(id);

    // console.log(
    //   "🚀 ~ file: posts.js/Controller ~ line 31 ~ getPost ~ post",
    //   post
    // );

    res.status(200).json({ post: post });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newData = {
    ...post,
    creator: req.userId,

    createdAt: new Date().toISOString(),
  };

  const newPost = new PostMessage(newData);

  // console.log("🚀 ~ file: posts.js ~ line 36 ~ createPost ~ newPost", newPost);

  try {
    const result = await newPost.save();

    // console.log("🚀 ~ file: posts.js ~ line 35 ~ createPost ~ result", result);

    res.status(201).json(result);
  } catch (error) {
    res.json(error);
    // res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;

  // console.log(
  //   "🚀 ~ file: posts.js Controller ~ line 39 ~ updatePost ~ req.body",
  //   req.body
  // );

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post found with that ID");
  }
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    // console.log(
    //   "🚀 ~ file: posts.js Controller ~ line 45 ~ updatePost ~ updatedPost",
    //   updatedPost
    // );

    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No Post Found With That Id");
    }

    const deletePost = await PostMessage.findByIdAndDelete(_id);

    // console.log(
    //   "🚀 ~ file: posts.js/Controller ~ line 70 ~ deletePost ~ deletePost",
    //   deletePost
    // );

    res.status(200).send(deletePost);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const likeCountPost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unautorized User" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post Found With That Id");
  }

  try {
    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    // console.log(
    //   "🚀 ~ file: posts.js/Controller ~ line 90 ~ likePost ~ updatedPost",
    //   updatedPost
    // );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPostsBySearch = async (req, res) => {
  // console.log(
  //   "🚀 ~ file: posts.js?controller ~ line 130 ~ getPostsBySearch ~ req.query",
  //   req.query
  // );
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const searchedPosts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    // console.log(
    //   "🚀 ~ file: posts.js/Controller ~ line 138 ~ getPostsBySearch ~ posts",
    //   searchedPosts
    // );

    res.status(200).json({ posts: searchedPosts });
  } catch (error) {
    res.status(404).json({ message: "Message Not found", error });
  }
};
