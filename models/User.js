const { Client } = require('pg');
const connection = new Client({
    user:process.env.PG_USER,
    host:process.env.PG_HOST,
    database:process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port:5432
  });
connection.connect();

class Create {
    constructor({name,id,password}){
        this.name = name;
        this.id = id;
        this.password = password;
    }

    queryArray(){
        return [this.name,this.id,this.password];
    }
}

module.exports = {

    create:({name,id,password})=>{
        return new Promise((resolve,reject)=>{
            const createUser = new Create({
                name:name,
                id:id,
                password:password
            }).queryArray();

            console.log('createUser:',createUser);

            const insert_query = {
                text:'INSERT INTO users (name,login_id,login_password) VALUES($1,$2,$3);',
                values:createUser
            };
            connection.query(isert_query)
                .then(res=>{
                    console.log('新規登録成功');
                    resolve('post succeeded!');
                })
                .catch(e=>console.log(e)); 
        })
    }
}
