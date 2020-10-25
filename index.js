const express = require('express');
const app = express();
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 5000
const { Client } = require('pg');
const path = require('path');
const router = require('./routers/index');
const usersRouter = require('./routers/users');
const request = require('request-promise');

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

const create_nonceTable = {
    text:'CREATE TABLE IF NOT EXISTS nonces (id SERIAL NOT NULL, login_id VARCHAR(50), nonce VARCHAR(255));'
}

connection.query(create_nonceTable)
    .then(()=>{
        console.log('table nonce created successfully');
    })
    .catch(e=>console.log(e));

app
   .use(express.static(path.join(__dirname, 'public')))
   .use('/',router)
   .post('/hook',line.middleware(config),(req,res)=> lineBot(req,res))
   .use(express.json())
   .use(express.urlencoded({extended:true}))
   .use('/api/users',usersRouter)
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')  
   .listen(PORT,()=>console.log(`Listening on ${PORT}`));

   const lineBot = (req,res) => {
    res.status(200).end();
    const events = req.body.events;
    const promises = [];
    for(let i=0;i<events.length;i++){
        const ev = events[i];
        console.log('ev:',ev);
        switch(ev.type){
            case 'follow':
                promises.push(greeting_follow(ev));
                break;
            
            case 'message':
                promises.push(handleMessageEvent(ev));
                break;

            case 'accountLink':
                promises.push(accountLink(ev));
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

    if(text === 'アカウント連携'){
        const userId = ev.source.userId;
        const options = {
            url:`https://api.line.me/v2/bot/user/${userId}/linkToken`,
            method:'POST',
            headers:{
                'Authorization':'Bearer /hwe0EhoKLsy2P1ynqJOWH3TWytYYrqlO6w9cPiDVjdJwwx2NoPosK98vovYkAH5Xu1oqYvpY8Fmr6/kE3maBr/zjr7I4MQ1az2puov0vg0CWmNgCQSulsMJd0yOqR2ruchBI0Uwntg7fE8tCgdWDQdB04t89/1O/w1cDnyilFU='
            }
        }

        request(options)
            .then(body=>{
                const parsedBody = JSON.parse(body);
                console.log('parsedBody:',parsedBody)
                console.log('linkToken:',parsedBody["linkToken"]);
                
                return client.replyMessage(ev.replyToken,{
                    "type":"flex",
                    "altText":"link",
                    "contents":
                    {
                      "type": "bubble",
                      "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                          {
                            "type": "button",
                            "action": {
                              "type": "uri",
                              "label": "自社HPログイン画面へ",
                              "uri": `https://linebot-account-renkei.herokuapp.com?linkToken=${parsedBody["linkToken"]}`
                            }
                          }
                        ]
                      }
                    }
                  });
            })
            .catch(e=>console.log(e));
    }else{
        return client.replyMessage(ev.replyToken,{
            "type":"text",
            "text":`${profile.displayName}さん、今${text}って言いました？`
        });
    }
 }

const accountLink = (ev) => {
    const lineId = ev.source.userId;
    const nonce = ev.link.nonce;
    console.log('nonce',nonce);

    const select_query = {
        text:`SELECT * FROM nonces;`
    };
    connection.query(select_query)
        .then(res=>{
            console.log('res.rows:',res.rows);
            const filtered = res.rows.filter(object=>{
                return object.nonce === nonce;
            });
            console.log('filtered:',filtered);
            const login_id = filtered[0].login_id;
            console.log('login_id',login_id);
            const insert_query = {
                text:`INSERT INTO users (line_id) VALUES($1) WHERE login_id=${login_id};`,
                values:[`${lineId}`]
            };
            connection.query(insert_query)
                .then(res=>{
                    console.log('アカウント連携成功！！');
                })
                .catch(e=>console.log(e));
        })
        .catch(e=>console.log(e));
}