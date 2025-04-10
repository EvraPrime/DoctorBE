const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profileController');
const billsController = require('../../controllers/billsController');

router.route('/')
    .get(profileController.getProfile)

router.route('/bills')
    .get(billsController.getAllBillsByUser)

module.exports = router;