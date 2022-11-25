const express = require('express');
const router = express.Router();
const signOuttController = require('../controllers/signOutController');

router.get('/', signOuttController.handleSignOut);

module.exports = router;