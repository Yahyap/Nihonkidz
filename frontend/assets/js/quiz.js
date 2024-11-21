document.addEventListener("DOMContentLoaded", async function () {
  // Contoh data respons JSON
  // const quizData = {
  //   quiz: [
  //     {
  //       pertanyaan_id: 1,
  //       id_quiz: 1,
  //       gambar: "assets/img/hiragana/Hiragana_あ_stroke_order_animation.gif",
  //       jawaban_benar: "a",
  //       option1: "a",
  //       option2: "i",
  //       option3: "u",
  //       option4: "e",
  //     },
  //     {
  //       pertanyaan_id: 2,
  //       id_quiz: 1,
  //       gambar: "assets/img/hiragana/Hiragana_い_stroke_order_animation.gif",
  //       jawaban_benar: "i",
  //       option1: "a",
  //       option2: "i",
  //       option3: "u",
  //       option4: "e",
  //     },
  //     {
  //       pertanyaan_id: 3,
  //       id_quiz: 1,
  //       gambar: "assets/img/hiragana/Hiragana_う_stroke_order_animation.gif",
  //       jawaban_benar: "u",
  //       option1: "a",
  //       option2: "i",
  //       option3: "u",
  //       option4: "e",
  //     },
  //     {
  //       pertanyaan_id: 4,
  //       id_quiz: 1,
  //       gambar: "assets/img/hiragana/Hiragana_え_stroke_order_animation.gif",
  //       jawaban_benar: "e",
  //       option1: "a",
  //       option2: "i",
  //       option3: "u",
  //       option4: "e",
  //     },
  //     {
  //       pertanyaan_id: 5,
  //       id_quiz: 1,
  //       gambar: "assets/img/hiragana/Hiragana_お_stroke_order_animation.gif",
  //       jawaban_benar: "o",
  //       option1: "a",
  //       option2: "o",
  //       option3: "u",
  //       option4: "e",
  //     },
  //   ],
  // };

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  // Ambil id_quiz dan pilihan dari URL
  let id_quiz = getQueryParam("id_quiz");

  console.log("ID Kuis:", id_quiz);

  let quizData = {}; // Deklarasi variabel global

  async function fetchQuizData() {
    try {
      const response = await fetch(
        `https://quiz-dot-sonic-totem-438312-d0.et.r.appspot.com/belajar/quiz/${id_quiz}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        window.location.href = "login.html";
      }

      quizData = await response.json(); // Update variabel global
      console.log(quizData);

      // Memulai dengan pertanyaan pertama
      showNextQuestion();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Memanggil fungsi untuk memuat data kuis
  fetchQuizData();
  // Fungsi untuk membuat tombol jawaban
  function createButton(text) {
    const button = document.createElement("button");
    button.className =
      "mb-2 btn btn-sm card shadow border-start-success py-2 d-flex justify-content-center align-items-center w-100";
    button.onclick = function () {
      handleClick(button, text);
    };

    const cardBody = document.createElement("div");
    cardBody.className = "card-body m-1 p-1";

    const innerText = document.createElement("div");
    innerText.className = "text-dark fw-bold h7 mb-0";
    innerText.innerHTML = `<span>${text}</span>`;

    cardBody.appendChild(innerText);
    button.appendChild(cardBody);

    return button;
  }

  // Fungsi untuk menampilkan pertanyaan quiz
  function loadQuestion(question) {
    // Membuat struktur elemen HTML
    const rowDiv = document.createElement("div");
    rowDiv.className = "row g-2 mb-2 quiz-question justify-content-center";
    rowDiv.setAttribute("data-answer", question.jawaban_benar);

    const imgCol = document.createElement("div");
    imgCol.className = "col-auto";

    const imgCard = document.createElement("div");
    imgCard.className = "card mb-4";

    const imgDiv = document.createElement("div");
    imgDiv.className = "d-flex align-items-center justify-content-center";

    const img = document.createElement("img");
    img.src = question.gambar;
    img.className = "rounded float-left img-fluid";

    imgDiv.appendChild(img);
    imgCard.appendChild(imgDiv);
    imgCol.appendChild(imgCard);

    const answersCol = document.createElement("div");
    answersCol.className = "col-lg-7 d-flex flex-column gap-2";

    const answersRow = document.createElement("div");
    answersRow.className =
      "row d-flex justify-content-center align-items-center";

    const answers = [
      question.option1,
      question.option2,
      question.option3,
      question.option4,
    ];

    answers.forEach((answer) => {
      const answerCol = document.createElement("div");
      answerCol.className = "col-9";
      answerCol.appendChild(createButton(answer));
      answersRow.appendChild(answerCol);
    });

    answersCol.appendChild(answersRow);

    const nextButtonDiv = document.createElement("div");
    nextButtonDiv.className =
      "justify-content-center align-items-center d-flex";

    const nextButton = document.createElement("button");
    nextButton.className = "btn btn-primary next-button";
    nextButton.onclick = function () {
      showNextQuestion();
    };
    nextButton.style.display = "none";
    nextButton.textContent = "Next";

    nextButtonDiv.appendChild(nextButton);

    rowDiv.appendChild(imgCol);
    rowDiv.appendChild(answersCol);
    rowDiv.appendChild(nextButtonDiv);

    // Menghapus pertanyaan sebelumnya jika ada
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    // Menambahkan elemen ke dalam container
    quizContainer.appendChild(rowDiv);
  }

  // Fungsi untuk menangani klik tombol jawaban
  function handleClick(button, answer) {
    const $button = $(button);
    const question = $(".quiz-question").first();
    const correctAnswer = question.data("answer");

    // Nonaktifkan tombol
    $button.prop("disabled", true).addClass("disabled");

    if (answer === correctAnswer) {
      $button.removeClass("border-start-success").addClass("btn-success");

      // Tambahkan emoji jempol di sebelah tombol
      const thumbsUp = $('<span class="emoji-thumbs-up">👍</span>');
      $button.append(thumbsUp);

      // Tampilkan dan animasikan emoji jempol
      setTimeout(() => {
        thumbsUp.addClass("show");
      }, 100);

      // Tampilkan tombol "Next"
      question.find(".next-button").show();
    } else {
      $button.removeClass("border-start-success").addClass("btn-danger");

      // Tambahkan emoji X di sebelah tombol
      const xMark = $('<span class="emoji-x">✖</span>');
      $button.append(xMark);

      // Tampilkan dan animasikan emoji X
      setTimeout(() => {
        xMark.addClass("show");
      }, 100);
    }
  }

  // Fungsi untuk menampilkan pertanyaan berikutnya
  let currentQuestionIndex = 0;

  function showNextQuestion() {
    if (currentQuestionIndex < quizData.quiz.length) {
      loadQuestion(quizData.quiz[currentQuestionIndex]);
      currentQuestionIndex++;
    } else {
      $("#quizEndModal").modal("show");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }

  // Memulai dengan pertanyaan pertama
});
function closeQuiz() {
  window.location.href = "belajar.html";
}
