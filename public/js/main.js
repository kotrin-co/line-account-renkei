const divLogin = document.getElementById('login_area');

const formElement = document.createElement('form');
formElement.setAttribute('id','login');
formElement.setAttribute('name','login_info');
formElement.setAttribute('method','post');
formElement.setAttribute('action','');

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

const loginButton = document.createElement('input');
loginButton.value = 'ログイン';
loginButton.addEventListener('click',(e)=>{
    formElement.submit();
})

formElement.appendChild(div_form1);
formElement.appendChild(div_form2);
formElement.appendChild(loginButton);

divLogin.appendChild(formElement);