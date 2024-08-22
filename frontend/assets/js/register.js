document.getElementById('regisForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const firstname = document.getElementById('InputFirstname').value;
    const lastname = document.getElementById('InputLastname').value;
    const user_email_address = document.getElementById('InputEmail').value;
    const user_password = document.getElementById('InputPassword').value;
    const user_password_repeat = document.getElementById('InputPasswordrepeat').value;

    const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, user_email_address, user_password, user_password_repeat })
    });

    const result = await response.json();
    if (response.ok) {
        window.location.href = 'login.html';
    } else {
        alert(result.message);
    }
});