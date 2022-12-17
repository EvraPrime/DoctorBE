const express = require('express');
const router = express.Router();
const patientsController = require('../../controllers/patientsController');

router.route('/')
    .get(patientsController.getAllPatient)
    .post(patientsController.createNewPatient);

module.exports = router;