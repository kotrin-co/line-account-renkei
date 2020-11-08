const express = require('express');
const router = express.Router();
const controller = require('../controllers/link');

router
    .route('/')
    .get(controller.accountLink);

module.exports = router;