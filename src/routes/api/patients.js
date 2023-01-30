const express = require('express');
const router = express.Router();
const patientsController = require('../../controllers/patientsController');

router.route('/')
    .get(patientsController.getAllPatient)
    .delete(patientsController.deletePatient)
    .put(patientsController.updatePatient)
    .post(patientsController.createNewPatient);

module.exports = router;