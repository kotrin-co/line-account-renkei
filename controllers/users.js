const User = require('../models/User');
const {randomBytes} = require('crypto')

const { Client } = require('pg');
const connection = new Client({
    user:process.env.PG_USER,
    host:process.env.PG_HOST,
    database:process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port:5432
  });
connection.connect();

module.exports = {

    postUser: (req,res) => {
        try{
            const {name,id,password} = req.body;
            console.log('name id pass',name,id,password);
            User.create({name,id,password})
                .then(message=>{
                    console.log('message:',message);
                    res.status(200).redirect('https://linebot-account-renkei.herokuapp.com/');
                })
                .catch(e=>console.log(e.stack));
         }catch(error){
             res.status(400).json({message:error.message});
         }
    },

    postLogin: (req,res) => {
        try{
            console.log('req.body:',req.body);
            const {id,password,linkToken} = req.body;
            // ログインidとlinkTokenの分離
            // const splitId = id.split('&');
            // const originId = splitId[0];
            // const linkToken = splitId[1];
            console.log('id linktoken pass',id,password,linkToken);
            User.check()
                .then(response=>{
                    console.log('response:',response);
                    const filtered = response.filter(object=>{
                        return object.login_id === id && object.login_password === password;
                    });
                    if(filtered.length){
                        console.log('認証成功');
                        // nonce生成d
                        const N=16
                        const randomStrings = randomBytes(N).reduce((p,i)=> p+(i%36).toString(36),'');
                        const buf = Buffer.from(randomStrings);
                        const nonce = buf.toString('base64');
                        // nonceテーブルへの挿入
                        const insert_query = {
                            text:'INSERT INTO nonces (login_id,nonce) VALUES($1,$2);',
                            values:[`${id}`,`${nonce}`]
                        }
                        connection.query(insert_query)
                            .then(response=>{
                                console.log('insert into nonces 成功');
                                console.log('linktoken nonce:',linkToken,nonce);
                                const linkSentence = `accountLink?linkToken=${linkToken}&nonce=${nonce}`;
                                // アイディアここでリダイレクトするのでなく、linktokenとnonceをフロント側へ返してあげ、フロント側で下記ページへGETする
                                res.status(200).send(linkSentence);
                                // res.status(200).redirect(`https://access.line.me/dialog/bot/accountLink?linkToken=${linkToken}&nonce=${nonce}`);
                            })
                            .catch(e=>console.log(e));
                    }else{
                        console.log('ログイン失敗');
                    }
                })
                .catch(e=>console.log(e));

         }catch(error){
             res.status(400).json({message:error.message});
         }
    }
}