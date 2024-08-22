document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const user_email_address = document.getElementById('InputEmail').value;
    const user_password = document.getElementById('InputPassword').value;

    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ user_email_address, user_password }),
    });

    const result = await response.json();
    if (response.ok) {
        window.location.href = 'index.html';
    } else {
        alert(result.message);
    }
});