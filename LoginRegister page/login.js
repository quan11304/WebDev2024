document.getElementById('loginBtn').addEventListener('click', function () {
    loginUser();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        loginUser();
    }
});

function loginUser() {
    // Get input values from login form
    var inputUsernameOrEmail = document.getElementById('usernameoremail').value;
    var inputPassword = document.getElementById('password').value;

    // Retrieve stored email, username, and password from localStorage
    var storedUsername = localStorage.getItem('username');
    var storedEmail = localStorage.getItem('email');
    var storedPassword = localStorage.getItem('password');

    // Check if the input matches the stored data
    if ((inputUsernameOrEmail === storedEmail || inputUsernameOrEmail === storedUsername) && inputPassword === storedPassword) {
        window.location.href = '../Home page/home.html';
    } else {
        alert('Username/Email or Password is invalid!');
    }
}

// Clear Username/Email
document.getElementById('clearUsernameEmail').addEventListener('click', function () {
    document.getElementById('usernameoremail').value = '';
});

// Toggle Password Visibility
document.getElementById('viewPassword').addEventListener('click', function () {
    var passwordInput = document.getElementById('password');
    var passwordIcon = document.getElementById('viewPassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.src = '../LoginRegister page/image/ViewPassword.png'; 
    } else {
        passwordInput.type = 'password';
        passwordIcon.src = '../LoginRegister page/image/ViewPassword.png'; // Change back to 'view' icon
    }
});