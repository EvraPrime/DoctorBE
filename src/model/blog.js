const mongoose = require('mongoose');

const BlogsSchema = mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    require: true,
  }
}, {timestamps: true})

const Blog = mongoose.model("Blogs", BlogsSchema)

module.exports = Blog;