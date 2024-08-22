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
