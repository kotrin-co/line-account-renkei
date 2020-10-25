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

    getUsers: (req,res) => {
        User.findAll()
            .then(users=>{
                res.status(200).json(users);
            })
            .catch(e=>console.log(e));
    }
}