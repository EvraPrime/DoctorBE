const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/bookingController');

router.route('/hospital')
    .get(bookingController.getAllHospital)

module.exports = router;