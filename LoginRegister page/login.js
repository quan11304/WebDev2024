document.getElementById('loginBtn').addEventListener('click', function () {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === 'AnhNT@gmail.com' && password === 'AnhNT!') {
        window.location.href = '/Code/WebDev2024/Home page/home.html';
    } else {
        alert('Invalid email or password!');
    }
});