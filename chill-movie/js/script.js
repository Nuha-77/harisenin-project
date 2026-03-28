// TOGGLE PASSWORD
document.querySelectorAll(".toggle-password").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      btn.innerText = "🙈";
    } else {
      input.type = "password";
      btn.innerText = "👁️";
    }
  });
});

// LOGIN
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    if (user === "" || pass === "") {
      alert("Isi semua field");
      return;
    }

    window.location.href = "index.html";
  });
}

// REGISTER
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;
    const confirm = document.getElementById("regConfirm").value;

    if (!user || !pass || !confirm) {
      alert("Lengkapi semua data");
      return;
    }

    if (pass !== confirm) {
      alert("Password tidak sama");
      return;
    }

    alert("Berhasil daftar!");
    window.location.href = "login.html";
  });
}