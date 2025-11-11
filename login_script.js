function handleLoginSubmission(e) {
    e.preventDefault(); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDisplay = document.getElementById('login-error-message');
    
    // --- Netlify Serverless Fetch Logic ---
    fetch('/.netlify/functions/login-serverless', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // MUST send data as JSON
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            errorDisplay.textContent = 'Login successful!';
            errorDisplay.style.color = '#4caf50';
            
            // Redirect based on the function's response
            setTimeout(() => {
                window.location.href = data.redirect; 
            }, 1000); 
            
        } else {
            errorDisplay.textContent = data.message;
            errorDisplay.style.color = '#f44336';
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        errorDisplay.textContent = 'A network error occurred during login.';
    });
}
