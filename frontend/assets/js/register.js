document
  .getElementById("regisForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const firstname = document.getElementById("InputFirstname").value;
    const lastname = document.getElementById("InputLastname").value;
    const user_email_address = document.getElementById("InputEmail").value;
    const user_password = document.getElementById("InputPassword").value;
    const user_password_repeat = document.getElementById(
      "InputPasswordrepeat"
    ).value;

    const response = await fetch("https://auth-dot-sonic-totem-438312-d0.et.r.appspot.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        user_email_address,
        user_password,
        user_password_repeat,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      let popContext = document.getElementById("finEndModalLabel");
      popContext.innerText = result.status;
      let spanElement = document.getElementById("finreason");
      spanElement.textContent = result.message;
      $("#finEndModal").modal("show");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      
    } else {
      let popContext = document.getElementById("quizEndModalLabel");
      popContext.innerText = result.status;
      let spanElement = document.getElementById("reason");
      spanElement.textContent = result.message;
      $("#quizEndModal").modal("show");
    }
  });

document.getElementById("finButton").addEventListener("click", async function() {
  window.location.href = "login.html";
});