const User = require('../models/User');

module.exports = {

    postTodo: (req,res) => {
        try{
            const {name,id,password} = req.body;
            User.create({name,id,password})
                .then(message=>{
                    console.log('message:',message);
                    res.status(200).send(message);
                })
                .catch(e=>console.log(e.stack));
         }catch(error){
             res.status(400).json({message:error.message});
         }
    }
}