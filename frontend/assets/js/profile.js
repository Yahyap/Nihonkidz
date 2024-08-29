let useremail;

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:8081/auth/protected", {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();
    useremail = result.user.user_email_address;
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
      const response = await fetch("http://localhost:8081/auth/logout", {
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

document
  .getElementById("updatenameform")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const user_email_address = document.getElementById("InputEmail").value;
    const new_firstname = document.getElementById("FirstName").value;
    const new_lastname = document.getElementById("LastName").value;

    console.log(useremail);

    if (user_email_address != useremail) {
      let spanElement = document.getElementById("error");
      spanElement.textContent = "Email salah";
      $("#quizEndModal").modal("show");
      stop;
    }

    const response = await fetch("http://localhost:8082/user/updatename", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        user_email_address,
        new_firstname,
        new_lastname,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      let spanElement = document.getElementById("error");
      spanElement.textContent = result.message;
      $("#quizEndModal").modal("show");
    }
  });

document
  .getElementById("updatepassform")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const old_password = document.getElementById("old_password").value;
    const new_password = document.getElementById("new_password").value;
    const con_new_password = document.getElementById("con_new_password").value;

    const response = await fetch("http://localhost:8082/user/updatepass", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        old_password,
        new_password,
        con_new_password,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      let spanElement = document.getElementById("error");
      spanElement.textContent = result.message;
      $("#quizEndModal").modal("show");
    }
  });
