const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router
    .route('/')
    .post(controller.postTodo);

module.exports = router;