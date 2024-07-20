let fname = document.getElementById('first_name');
let lname = document.getElementById('last_name');
let email = document.getElementById('email_sigin')
let password = document.getElementById('password_signin');
let conpassword = document.getElementById('confirm_password');

let sigin_btn = document.querySelector('.SignIn_btn');

let error = document.querySelector('.error')
error.style.color = 'blue';
error.style.fontSize='20px'

sigin_btn.addEventListener('click', function (e) {
    e.preventDefault()

    if(fname.value === '' || lname.value === '' || password.value === '' || conpassword.value === ''){
        error.textContent = 'Please Fill all the details !';
    }
    else if(password.value  === conpassword.value){

        let users = JSON.parse(localStorage.getItem('users') ?? "[]")
        let filterUsers = users.filter((user) => user.email === email.value)
        if(filterUsers.length > 0){
            error.textContent = 'User already exist !'
        }
        else{
            users.push({
                fname: fname.value,
                lname: lname.value,
                email: email.value,
                password: password.value,
                createdAt: new Date(),
            });

            localStorage.setItem("users", JSON.stringify(users));
            alert('You are successfully Signed In');
            window.location.href = './login.html'
            error.textContent = '';
            fname.value = '';
            lname.value = '';
            email.value = '';
            password.value = '';
            conpassword.value = '';
        }
    }
    else{
        error.textContent = 'Please make sure Password and Confirm Password is equal'
    }
})

// click On Logo Goto home

function clickOnLogoGotoHome(){
    window.location.href = './index.html'
}