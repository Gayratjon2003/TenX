const inputEmail = document.querySelector('.input-email');
const invalidText = document.querySelector('.login-invalid');
const password1 = document.querySelector('.input-password-1');
const signIn = document.querySelector('.btn-sign-in');

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
