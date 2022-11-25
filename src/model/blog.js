const mongoose = require('mongoose');

const BlogsSchema = mongoose.Schema({
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
  }
}, {timestamps: true})

const Blog = mongoose.model("Blogs", BlogsSchema)

module.exports = Blog;