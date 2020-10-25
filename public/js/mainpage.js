const param = new URL(location).search;
const splitParam = param.split('&');
const id = splitParam[0].slice(1);
const password = splitParam[1];
const linkToken = splitParam[2];

document.getElementById('text_id').innerHTML = id;
document.getElementById('text_password').innerHTML = password;
document.getElementById('text_linkToken').innerHTML = linkToken;

// const linkToken = splitParam[1];
// document.getElementById('urlparam').innerHTML = linkToken;

// const N=16
// const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(N)))).substring(0,N);
// document.getElementById('nonce').innerHTML = nonce;

// const target = document.getElementById('login-tag');
// target.href = `https://access.line.me/dialog/bot/accountLink?linkToken=${linkToken}&nonce=${nonce}`;