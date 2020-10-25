const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router
    .route('/')
    .post(controller.postUser);

router
    .route('/login')
    .post(controller.postLogin);

module.exports = router;