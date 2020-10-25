const express = require('express');
const app = express();
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 5000
const { Client } = require('pg');
const path = require('path');
const router = require('./routers/index');
const usersRouter = require('./routers/users');

const config = {
   channelAccessToken:process.env.ACCESS_TOKEN,
   channelSecret:process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

const connection = new Client({
    user:process.env.PG_USER,
    host:process.env.PG_HOST,
    database:process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port:5432
  });
connection.connect();

const create_userTable = {
text:'CREATE TABLE IF NOT EXISTS users (id SERIAL NOT NULL, name VARCHAR(50), login_id VARCHAR(50), login_password VARCHAR(50), line_id VARCHAR(255));'
};
    
connection.query(create_userTable)
.then(()=>{
    console.log('table users created successfully!!');
})
.catch(e=>console.log(e));  

app
   .use(express.static(path.join(__dirname, 'public')))
//    .use(multipart())
   .use('/',router)
   .use('/api/users',usersRouter)
   .post('/hook',line.middleware(config),(req,res)=> lineBot(req,res))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use(express.json())
   .use(express.urlencoded({extended:true}))
   .listen(PORT,()=>console.log(`Listening on ${PORT}`));

   const lineBot = (req,res) => {
    res.status(200).end();
    const events = req.body.events;
    const promises = [];
    for(let i=0;i<events.length;i++){
        const ev = events[i];
        switch(ev.type){
            case 'follow':
                promises.push(greeting_follow(ev));
                break;
            
            case 'message':
                promises.push(handleMessageEvent(ev));
                break;
        }
    }
    Promise
        .all(promises)
        .then(console.log('all promises passed'))
        .catch(e=>console.error(e.stack));
 }

 const greeting_follow = async (ev) => {
    const profile = await client.getProfile(ev.source.userId);
    return client.replyMessage(ev.replyToken,{
        "type":"text",
        "text":`${profile.displayName}さん、フォローありがとうございます\uDBC0\uDC04`
    });
 }


 const handleMessageEvent = async (ev) => {
    const profile = await client.getProfile(ev.source.userId);
    const text = (ev.message.type === 'text') ? ev.message.text : '';
    
    return client.replyMessage(ev.replyToken,{
        "type":"text",
        "text":`${profile.displayName}さん、今${text}って言いました？`
    });
 }