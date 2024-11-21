document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("https://auth-dot-sonic-totem-438312-d0.et.r.appspot.com/auth/protected", {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();
    if (response.ok) {
      let spanElement = document.getElementById("username");
      spanElement.textContent =
        result.user.firstname + ` ` + result.user.lastname;
    } else {
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error("Error fetching home:", error);
    window.location.href = "login.html";
  }
});

const logoutButton = document.getElementById("logoutBtn");
if (logoutButton) {
  logoutButton.addEventListener("click", async function () {
    try {
      const response = await fetch("https://auth-dot-sonic-totem-438312-d0.et.r.appspot.com/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        window.location.href = "login.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed. Please try again.");
    }
  });
}

function speak(text) {
  window.speechSynthesis.cancel();
  // Create a new instance of SpeechSynthesisUtterance
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP"; // Set the language to Japanese
  utterance.volume = 1; // Volume: 0 to 1
  utterance.rate = 0.6; // Rate: 0.1 to 2
  // Speak the utterance
  window.speechSynthesis.speak(utterance);
}
function switchKana() {
  const spans = document.querySelectorAll("[data-hiragana]");
  const button = document.querySelector("button.btn-primary");
  spans.forEach((span) => {
    if (span.textContent === span.getAttribute("data-hiragana")) {
      span.textContent = span.getAttribute("data-katakana");
    } else {
      span.textContent = span.getAttribute("data-hiragana");
    }
  });
}
