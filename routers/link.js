const express = require('express');
const router = express.Router();
const controller = require('../controllers/link');

router
    .route('/')
    .get(controller.accountLink);

router
    .get('/index',(req,res)=>{
        res.render('pages/index')});

module.exports = router;