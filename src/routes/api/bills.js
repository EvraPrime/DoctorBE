const express = require('express');
const router = express.Router();
const billsController = require('../../controllers/billsController');

router.route('/')
    .get(billsController.getAllBills)
    .post(billsController.createNewBill)

module.exports = router;