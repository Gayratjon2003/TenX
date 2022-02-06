'use strict'
const SignUp = document.querySelector('.btn-sign-up');
const inputEmail = document.querySelector('.input-email');
const invalidText = document.querySelector('.login-invalid');
const password1 = document.querySelector('.input-password-1')
const password2 = document.querySelector('.input-password-2')
// const btnGet = document.querySelector('.btn-2');  
const baseUrl = 'http://localhost:1337';

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data) 
    });
    return response.json(); // await 
  }


  SignUp.addEventListener('click', ()=> {
    postData(`${baseUrl}/api/auth/local/register`, {
        email: inputEmail.value,
        password: password1.value,
    }).then((res) => {
        console.log(res.jwt);
        let jwtMy = res.jwt;
        localStorage.setItem('token', jwtMy)
    }).catch((err)=> {
        console.log(err.message);
    })
});
let email = inputEmail.value;
    function checkEmail(email) {
    if (email.indexOf("@") !== -1 && email.indexOf(".") !== -1 && password1.value === password2.value && password1.value > 5) {
        if( email.indexOf(".") > email.indexOf("@") ) {
            // location.href = "../index.html";
        } else {
          invalidText.style.opacity = 1;
          invalidText.style.visibility = 'visible';

        }
        
    } else {
        // console.log('yo`q');
          invalidText.style.opacity = 1;
          invalidText.style.visibility = 'visible';
    }
}
checkEmail(email)

