const express = require('express');
const router = express.Router();
const blogsController = require('../../controllers/blogsController');

router.route('/')
    .get(blogsController.getAllNews)

module.exports = router;