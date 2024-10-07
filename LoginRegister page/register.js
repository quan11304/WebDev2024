document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get input values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repeatPassword = document.getElementById('repeatPassword').value;

    // Log input values for debugging
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Repeat Password:', repeatPassword);

    // Check if password and repeat password match
    if (password !== repeatPassword) {
        alert('Passwords do not match!');
        console.log('Passwords do not match!');
        return;
    }

    // Save data to local storage
    try {
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        console.log('Data saved to localStorage!');
        
        // Redirect to login.html after successful registration
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Failed to save data to localStorage:', error);
    }

    // Reset form after submission
    document.getElementById('registerForm').reset();
});
