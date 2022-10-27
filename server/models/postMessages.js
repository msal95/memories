import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // minlength: 4,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    // minlength: 15,
    trim: true,
    maxlength: 200,
  },
  name: String,
  creator: String,
  tags: [String],
  selectedFile: {
    type: String,
    // required: true,
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const PostMessage = new mongoose.model("PostMessage", postSchema);

export default PostMessage;
