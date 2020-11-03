const express = require('express');

const router = express.Router();

router 
    .get('/',(req,res)=>{
        res.render('pages/index');
    })
    .get('/registration',(req,res)=>{
        res.render('pages/registration');
    })
    .get('/mainpage',(req,res)=>{
        res.render('pages/mainpage');
    })


module.exports = router;