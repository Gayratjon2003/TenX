'use strict'
const signUp = document.querySelector('.btn-sign-up');
const inputEmail = document.querySelector('.input-email');
const invalidText = document.querySelector('.login-invalid');
const password1 = document.querySelector('.input-password-1')
const password2 = document.querySelector('.input-password-2')
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


  signUp.addEventListener('click', ()=> {
    postData(`${baseUrl}/api/auth/local/register`, {
        identifier: inputEmail.value,
        password: 'salomsalom',
    }).then((res) => {
        console.log(res.jwt);
        let jwtMy = res.jwt;
        localStorage.setItem('token', jwtMy)
    }).catch((err)=> {
        console.log(err.message);
    })

    
});

const token = localStorage.getItem('token');
const bearer = 'Bearer ' + token;
console.log(token);

btnGet.addEventListener('click', ()=> {
fetch(`${baseUrl}/api/blogs`, {
    headers: {
    Authorization: bearer,
    }
  },
).then(data=> {
    console.log(data); 
})
})