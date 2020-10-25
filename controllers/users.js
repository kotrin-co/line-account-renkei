const User = require('../models/User');

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
            const {id,password} = req.body;
            const splitId = id.split('&');
            const originId = splitId[0];
            const linkToken = splitId[1];
            console.log('id linktoken pass',originId,linkToken,password);
            User.check()
                .then(response=>{
                    console.log('response:',response);
                    const filtered = response.filter(object=>{
                        return object.login_id === originId && object.login_password === password;
                    });
                    if(filtered.length){
                        console.log('認証成功');
                        res.status(200).redirect(`https://linebot-account-renkei.herokuapp.com/mainpage?${id}&${password}&${linkToken}`);
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