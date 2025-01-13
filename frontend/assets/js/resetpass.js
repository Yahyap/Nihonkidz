document
  .getElementById("resetForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    function getQueryParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
      }
    
      // Ambil id_quiz dan pilihan dari URL
      let token = getQueryParam("token");
    
      console.log("ID token:", token);

    const password = document.getElementById("InputPassword").value;
    const password_repeat = document.getElementById("InputPasswordrepeat").value;

    const response = await fetch(
      `https://auth-dot-sonic-totem-438312-d0.et.r.appspot.com/user/reset-password/${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, password_repeat }),
      }
    );

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
