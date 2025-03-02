import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: [String],
    default: [],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});

const Post = mongoose.model("Post", postSchema);

export default Post;
