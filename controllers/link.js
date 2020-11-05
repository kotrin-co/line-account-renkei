const request = require('request-promise');

module.exports = {

    accountLink: (req,res) => {
        const line_uid = req.query.line_uid;
        const options = {
            url:`https://api.line.me/v2/bot/user/${line_uid}/linkToken`,
            method:'POST',
            headers:{
                'Authorization':'Bearer /hwe0EhoKLsy2P1ynqJOWH3TWytYYrqlO6w9cPiDVjdJwwx2NoPosK98vovYkAH5Xu1oqYvpY8Fmr6/kE3maBr/zjr7I4MQ1az2puov0vg0CWmNgCQSulsMJd0yOqR2ruchBI0Uwntg7fE8tCgdWDQdB04t89/1O/w1cDnyilFU='
            }
        }

        request(options)
            .then(body=>{
                const parsedBody = JSON.parse(body);
                console.log('parsedBody:',parsedBody);
                console.log('linkToken:',parsedBody["linkToken"]);
                res.status(200).redirect(`https://linebot-account-renkei.herokuapp.com?linkToken=${parsedBody["linkToken"]}`)
            });
    }
}