const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/bookingController');

router.route('/hospital')
    .post(bookingController.getHospitalById)
    .get(bookingController.getAllHospital);

router.route('/doctor')
    .post(bookingController.getDoctorById)
    .get(bookingController.getAllDoctor);

module.exports = router;