let email = document.getElementById('email');
let password = document.getElementById('password');

let login_btn = document.querySelector('.LogIn_btn');
let error = document.querySelector('.error');
error.style.color = 'red';

function generateToken() {
    return Math.random().toString(36).substr(2);
}

login_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value === '' || password.value === '') {
        error.textContent = 'Please enter all details.';
    } else {
        error.textContent = '';
        let users = JSON.parse(localStorage.getItem("users") ?? "[]");
        if (users.length > 0) {
            let user = users.find((user) => user.email === email.value);
            if (user) {
                if (user.password === password.value) {
                    localStorage.setItem('currUser', JSON.stringify({
                        email: email.value,
                        password: password.value,
                        token: generateToken(),
                    }));
                    window.location.href = './profile.html';
                } else {
                    error.textContent = 'Wrong Password.';
                }
            } else {
                error.textContent = 'No such email exists.';
            }
        } else {
            alert('There is no user exist, please sign up first.');
            window.location.href = './signup.html';
        }
    }
});

