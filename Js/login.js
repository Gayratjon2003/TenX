const inputEmail = document.querySelector('.input-email');
const invalidText = document.querySelector('.login-invalid');
const password1 = document.querySelector('.input-password-1');
const signIn = document.querySelector('.btn-sign-in');
const baseUrl = 'http://localhost:1337';


signIn.addEventListener('click', ()=> {
    let email = inputEmail.value;
    function checkEmail(email) {
    if (email.indexOf("@") !== -1 && email.indexOf(".") !== -1 && password1.value > 5) {
        if( email.indexOf(".") > email.indexOf("@") ) {
            // location.href = "../index.html";
        } else {
          invalidText.style.opacity = 1;
          invalidText.style.visibility = 'visible';

        }
    } else {
        console.log('yo`q');
          invalidText.style.opacity = 1;
          invalidText.style.visibility = 'visible';
    }
}
checkEmail(email)
})

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

signIn.addEventListener('click', ()=> {
    console.log(inputEmail.value);
    console.log(password1.value);
    postData(`${baseUrl}/api/auth/local`, {
        identifier: inputEmail.value,
        password: password1.value,
    }).then((res) => {
        let jwtMy = res.jwt;
        localStorage.setItem('token', jwtMy)
    }).catch((err)=> {
        console.log(err.message);
    })
});

const token = localStorage.getItem('token');
const bearer = 'Bearer ' + token;
console.log(token);