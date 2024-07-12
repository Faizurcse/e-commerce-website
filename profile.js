let currUser = JSON.parse(localStorage.getItem('currUser'));

if(currUser){

}
else{
    alert('User dose not exist');
    alert('You are redirecting to Login Page')
    window.location.href = './login.html'
}


//The below code change the user name.

let first_name = document.getElementById('first_name');
let last_name = document.getElementById('last_name');
let error = document.querySelector('.error');

error.style.color = 'red'

let profile_btn = document.querySelector('.profile_btn');

profile_btn.addEventListener('click',(e) => {
    e.preventDefault();
    if(first_name.value == '' || last_name.value == ''){
        error.textContent = 'Please fill all fields'
    }
    else{
        error.textContent = '';
        let users = JSON.parse(localStorage.getItem('users') ?? '[]');

        let userIndex = users.findIndex((user) => user.email === currUser.email);

        if(userIndex !== -1){
            users[userIndex].fname = first_name.value;
            users[userIndex].lname = last_name.value;

            localStorage.setItem('users', JSON.stringify(users));
            alert('Profile updated successfully.')
        }
    }
})


//The below code change the old password by comparing new password.

let old_password = document.getElementById('old_password');
let new_password = document.getElementById('new_password');
let confirm_new_password = document.getElementById('confirm_new_password');

let change_pass_btn = document.querySelector('.change_pass_btn');

change_pass_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (old_password.value === '' || new_password.value === '' || confirm_new_password.value === '') {
        alert('Please fill all the fields');
    } else {
        if (old_password.value !== currUser.password || new_password.value !== confirm_new_password.value) {
            alert('Either your old password is wrong or the new password does not match the confirmed new password');
        } else {
            let users = JSON.parse(localStorage.getItem('users') ?? '[]');
            let index = users.findIndex(user => user.password === old_password.value);

            if (index !== -1) {
                users[index].password = new_password.value; 
                localStorage.setItem('users', JSON.stringify(users));
                alert('Password Changed');
            } else {
                alert('User not found');
            }
        }
    }
});



let Logout_btn = document.querySelector('.Logout_btn');

Logout_btn.addEventListener('click', ()=> {
    localStorage.removeItem('currUser');
})