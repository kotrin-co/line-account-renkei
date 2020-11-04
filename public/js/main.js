// 大元のdivエリア
const divLogin = document.getElementById('login_area');

// URLの？以降を取り出し、linkTokenを取得する処理
const param = new URL(location).search;
console.log('param:',param);
const pElement = document.createElement('p');
const splitParam = param.split('=');
console.log('splitparam:',splitParam);
const linkToken = splitParam[1];
pElement.innerHTML = linkToken;
divLogin.appendChild(pElement);

// フォームの生成。ここにlabelとinput要素を入れていく。
const formElement = document.createElement('form');
formElement.setAttribute('id','login');
formElement.setAttribute('name','login_info');
formElement.setAttribute('method','post');
formElement.setAttribute('action','/api/users/login');　//POST先のアドレス

// div_form1はログインIDに関するlabel要素とinput要素で構成
const div_form1 = document.createElement('div');

const label_form1 = document.createElement('label');
label_form1.setAttribute('class','label_id');
label_form1.textContent = 'ログインID';
div_form1.appendChild(label_form1);

const input_form1 = document.createElement('input');
input_form1.setAttribute('type','text');
input_form1.setAttribute('class','id-input');
input_form1.setAttribute('name','id');
div_form1.appendChild(input_form1);

// div_form2はパスワードに関するlabel要素とinput要素で構成
const div_form2 = document.createElement('div');

const label_form2 = document.createElement('label');
label_form2.setAttribute('class','label_password');
label_form2.textContent = 'パスワード';
div_form2.appendChild(label_form2);

const input_form2 = document.createElement('input');
input_form2.setAttribute('type','password');
input_form2.setAttribute('class','password-input');
input_form2.setAttribute('name','password');
div_form2.appendChild(input_form2);

// ログインボタン
const loginButton = document.createElement('input');
loginButton.value = 'ログイン';
loginButton.type = 'submit';
loginButton.addEventListener('click',(e)=>{
    // const id = document.login_info.id.value + '&' +linkToken;
    // document.login_info.id.value = id;
    // formElement.submit();
    const data = new FormData(formElement);
    data.append('linkToken',linkToken);

    console.log(...data.entries());

    fetch('/api/users/login',{
        method:'POST',
        data: data,
        credentials: 'same-origin'
    })
    .then(response=>{
        console.log('response:',response);
    })
    .catch(e=>console.log(e));
});

// フォーム要素にform1,form2,loginButtonを格納
formElement.appendChild(div_form1);
formElement.appendChild(div_form2);
formElement.appendChild(loginButton);

// フォーム要素を大元のdiv要素へ格納
divLogin.appendChild(formElement);