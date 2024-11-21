document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const user_email_address = document.getElementById("InputEmail").value;
    const user_password = document.getElementById("InputPassword").value;

    const response = await fetch("https://auth-dot-sonic-totem-438312-d0.et.r.appspot.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user_email_address, user_password }),
    });

    const result = await response.json();
    if (response.ok) {
      window.location.href = "index.html";
    } else {
      let popContext = document.getElementById("quizEndModalLabel");
      popContext.innerText = result.status;
      let spanElement = document.getElementById("reason");
      spanElement.textContent = result.message;
      $("#quizEndModal").modal("show");
    }
  });
