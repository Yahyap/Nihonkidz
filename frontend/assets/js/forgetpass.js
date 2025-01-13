document
  .getElementById("forgotForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("InputEmail").value;

    const response = await fetch(
      "https://auth-dot-sonic-totem-438312-d0.et.r.appspot.com/user/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      let popContext = document.getElementById("quizEndModalLabel");
      popContext.innerText = result.status;
      let spanElement = document.getElementById("reason");
      spanElement.textContent = result.message;
      $("#quizEndModal").modal("show");
    } else {
      let popContext = document.getElementById("quizEndModalLabel");
      popContext.innerText = result.status;
      let spanElement = document.getElementById("reason");
      spanElement.textContent = result.message;
      $("#quizEndModal").modal("show");
    }
  });
