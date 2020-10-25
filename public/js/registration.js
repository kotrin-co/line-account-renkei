const divRegistration = document.getElementById('registration_area');

const formElement = document.createElement('form');
formElement.setAttribute('id','registration');
formElement.setAttribute('name','user_info');
formElement.setAttribute('method','post');
formElement.setAttribute('action','/api/users');

const div_form0 = document.createElement('div');

const label_form0 = document.createElement('label');
label_form0.setAttribute('class','label_name');
label_form0.textContent = '名前';
div_form0.appendChild(label_form0);

const input_form0 = document.createElement('input');
input_form0.setAttribute('type','text');
input_form0.setAttribute('class','name-input');
input_form0.setAttribute('name','name');
div_form0.appendChild(input_form0);

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
input_form2.setAttribute('type','text');
input_form2.setAttribute('class','password-input');
input_form2.setAttribute('name','password');
div_form2.appendChild(input_form2);

const registrationButton = document.createElement('input');
registrationButton.value = '新規登録';
registrationButton.type = 'submit';
registrationButton.addEventListener('click',(e)=>{
    console.log('name',document.user_info.name.value);
    formElement.submit();
})

formElement.appendChild(div_form0);
formElement.appendChild(div_form1);
formElement.appendChild(div_form2);
formElement.appendChild(registrationButton);

divRegistration.appendChild(formElement);