const Blog = require('../model/blog');
require('dotenv').config();

const getAllNews = async (req, res) => {
  Blog.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result)
    }
  })
}

module.exports = { getAllNews }