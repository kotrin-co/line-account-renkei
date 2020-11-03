const express = require('express');
const querystring = require('querystring');
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

    .get('/login',(req,res)=>{
        const query = querystring.stringify({
            response_type: 'code',
            client_id: process.env.LINECORP_PLATFORM_CHANNEL_CHANNELID,
            redirect_uri: 'https://linebot-account-renkei.com/callback',
            state: 'hoge', // TODO: must generate random string
            scope: 'profile',
          })
          res.redirect(301, 'https://access.line.me/oauth2/v2.1/authorize?' + query)
    })

    .get('/callback',(req,res)=>{
        console.log('req.query:',req.query);
        res.send('code:'+req.query.code);
    })


module.exports = router;