// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//     const response = await fetch("http://localhost:8081/auth/protected", {
//       method: "GET",
//       credentials: "include",
//     });

//     const result = await response.json();
//     if (response.ok) {
//       let spanElement = document.getElementById("username");
//       spanElement.textContent =
//         result.user.firstname + ` ` + result.user.lastname;
//     } else {
//       window.location.href = "login.html";
//     }
//   } catch (error) {
//     console.error("Error fetching home:", error);
//     window.location.href = "login.html";
//   }
// });

// const logoutButton = document.getElementById("logoutBtn");
// if (logoutButton) {
//   logoutButton.addEventListener("click", async function () {
//     try {
//       const response = await fetch("http://localhost:8081/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       const result = await response.json();
//       if (response.ok) {
//         window.location.href = "login.html";
//       } else {
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//       alert("Logout failed. Please try again.");
//     }
//   });
// }

// function bacaartikel(id_artikel) {
//   const url = `artikel?id_artikel=${id_artikel}`;
//   window.location.href = url;
// }

function bacaartikel1() {
  window.location.href =
    "artikel/5-tips-seru-untuk-memulai-belajar-bahasa-Jepang.html";
}
function bacaartikel2() {
  window.location.href =
    "artikel/menguasai-hiragana-dan-katakana-panduan-pemula.html";
}
function bacaartikel3() {
  window.location.href =
    "artikel/kunci-sukses-berbicara-bahasa-jepang-dengan-lancar.html";
}
function bacaartikel4() {
  window.location.href =
    "artikel/kosakata-bahasa-jepang-sehari-hari-yang-harus-anda-ketahui.html";
}
function bacaartikel5() {
  window.location.href =
    "artikel/perbedaan-bahasa-jepang-formal-dan-Informal.html";
}
function bacaartikel6() {
  window.location.href =
    "artikel/belajar-kanji-10-karakter-dasar-yang-penting.html";
}
